
const {status} = require('loopback');
const systemConfig = require('../../server/core/system-config');
const util = require('../../server/core/util');
module.exports = function(Reservation) {
    // Reservation.getTableList = async (startTime) => {
    //     startTime = new Date(startTime);
    //     let endTime = new Date(startTime.getTime() + systemConfig.useTime);
    //     let reservedTableList = await Reservation.find({
    //         where: {
    //             startTime: {lt: endTime},
    //             endTime: {gt: startTime},
    //         },
    //     });
    // };

    Reservation.getGuestOrderList = async (phone) => {
        let list = await Reservation.findOne({
            where: {phone: phone, status: 1},
        });
        return list;
    };

    Reservation.guestCancelOrder = async (data) => {
        let requiredKeys = ['phone', 'id'];
        await util.toolsUtils.checkObject(data, requiredKeys);
        let checkOrder = await Reservation.findOne({
            where: {phone: data.phone, id: data.id},
        });
        if (!checkOrder) {
            let err = new Error('No corresponding order found.');
            err.statusCode = 400;
            throw err;
        }
        await Reservation.updateAll({phone: data.phone, id: data.id}, {status: 0});
        return true;
    };

    Reservation.guestUpdateOrder = async (data) => {
        let requiredKeys = ['phone', 'id'];
        await util.toolsUtils.checkObject(data, requiredKeys);
        let checkOrder = await Reservation.findOne({
            where: {phone: data.phone, id: data.id},
        });
        if (!checkOrder) {
            let err = new Error('No corresponding order found.');
            err.statusCode = 400;
            throw err;
        }
        // if(){

        // }
        await Reservation.updateAll({phone: data.phone, id: data.id}, {status: 1});
        return true;
    };
};

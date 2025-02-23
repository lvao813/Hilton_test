
/**
 *
 * 此脚本为了在第一次运行时可以快速使用，所以内置部分数据，并且内置了用户和密码，但线上不允许使用此方法注入用户
 */

module.exports =  (server) => {
    /**
     * 初始化数据：system是否存在，不存在创建一个新的账号用来管理员工数据
     * 写在引用内部方便获取模型
     */
    const findOrCreateSystem = async () => {
        const {CustomUser, DiningTable} = server.models;
        let checkSystem = await CustomUser.findOne({
            where: {
                username: 'system',
            },
            fields: ['id', 'username'],
        });
        if (!checkSystem) {
            let userSystem = await CustomUser.Create({
                username: 'system',
                email: 'system@gmail.com',
                phone: '12345678901',
                password: '123456',
                isDelete: 0,
                updateTime: new Date(),
                createTime: new Date(),
            });
        }
    };
    const initDiningTable = async () => {
        const {DiningTable} = server.models;
        // await DiningTable.destroyAll();
        let tableList = await DiningTable.find();

        if (tableList && tableList.length == 0) {
            let createTables = await DiningTable.create([
                {size: 4, name: '1号桌'},
                {size: 4, name: '2号桌'},
                {size: 4, name: '3号桌'},
                {size: 4, name: '4号桌'},
                {size: 6, name: '5号桌'},
                {size: 6, name: '6号桌'},
                {size: 6, name: '7号桌'},
                {size: 8, name: '8号桌'},
                {size: 8, name: '9号桌'},
                {size: 12, name: '10号桌'},
                {size: 12, name: '11号桌'},
                {size: 16, name: '12号桌'},
            ]);
            console.log(createTables);
        }
    };
    findOrCreateSystem();
    initDiningTable();
};

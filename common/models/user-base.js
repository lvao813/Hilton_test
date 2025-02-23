
const util = require('../../server/core/util');

module.exports = function(Userbase) {
    /**
     * 登陆
     * @param {*} data {"username":"system","password":"U2FsdGVkX1/O26FF1vjXckgHD+BW9cnUSpgiQdJklys="}
     * @param {*} req
     * @param {*} res
     * @param {*} options
     * @returns
     */
    Userbase.login = async (data, req, res, options) => {
        let requiredKeys = ['username', 'password'];
        let checkParams = await util.toolsUtils.checkObject(data, requiredKeys);

        const {CustomUser} = Userbase.app.models;
        const {username, password} = data;
        // 先生成错误对象，方便后续调用

        let checkUser = await CustomUser.findOne({
            where: {username: username,
                // isDelete: 0,
            },
            fields: ['id', 'username'],
        });
        if (!checkUser) {
            let err = new Error('Username or password is incorrect.');
            err.statusCode = 400;
            throw err;
        }
        // 密码使用加密传输，避免安全问题
        let plaintextPwd = util.toolsUtils.passworrdFactory.decryptAES(password);
        let token = await CustomUser.login({username: username, password: plaintextPwd});
        res.cookie('access_token', token.id, {
            signed: true,
        });
        return token;
    };
    Userbase.logout = async (res, options) => {
        const {CustomUser} = Userbase.app.models;
        await CustomUser.logout(options.accessToken.id);
        res.clearCookie('access_token');
        return true;
    };
};

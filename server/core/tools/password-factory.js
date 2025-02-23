let CryptoJS = require('crypto-js');
const systemConfig = require('../system-config');

module.exports = {

    /**
     * AES解密方法
     * @param {String} text 加密过的密文
     * @returns {String} 原文
     */
    decryptAES: (text) => {
        return CryptoJS.AES.decrypt(text, systemConfig.AESKeys).toString(CryptoJS.enc.Utf8);

        CryptoJS.AES.decrypt('U2FsdGVkX1/egpNOtgYl5WG2p6qgVU5RSmD9BosbmiY=', ':*mU@-\"A67Eujx$c').toString(CryptoJS.enc.Utf8)
    },

};

let util = require('../_init');

module.exports = () => {
    return new Promise(async (resolve, reject) => {
        try {
            if (util.token == null) {
                let options = {
                    method: 'POST',
                    body: {
                        'username': util.systemName,
                        'password': util.systemPassword,
                    },
                    uri: util.serverUrl + 'api/CustomUsers/login',
                    json: true, // Automatically stringifies the body to JSON
                };

                let token = await util.rp(options);
                util.token = token.id;
                resolve(token.id);
            } else {
                resolve(util.token);
            }
        } catch (error) {
            reject(error);
        }
    });
};


/**
 * 验证对象中的所有需要的入参
 * @param {*} obj 需要验证的对象
 * @param {*} required 必要的参数
 * @returns
 */
module.exports = (obj, required) => {
    return new Promise((resolve, reject)=>{
        required.forEach(item => {
            if (obj[item] === null) {
                let err = new Error(`${item} is required`);
                err.statusCode = 400;
                reject(err);
            }
        });
        resolve(true);
    });
};

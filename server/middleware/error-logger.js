let log4js = require('log4js');

const logger = log4js.getLogger('error');
module.exports = function(options) {
    return function logError(err, req, res, next) {
        logger.error(
        'Unhandled error for request %s %s: %s, statusCode: %s, stack: %s',
        req.method,
        req.url,
        err.message,
        err.statusCode,
        err.stack,
        );
        next(err);
    };
};

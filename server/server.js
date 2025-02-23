// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

let loopback = require('loopback');
let boot = require('loopback-boot');

let app = module.exports = loopback();

const {toNumber} = require('lodash');
const log4js = require('log4js');

app.start = function() {
  // start the web server
    return app.listen(function() {
        app.emit('started');
        let baseUrl = app.get('url').replace(/\/$/, '');
        console.log('Web server listening at: %s', baseUrl);
        if (app.get('loopback-component-explorer')) {
            let explorerPath = app.get('loopback-component-explorer').mountPath;
            console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
        }
    });
};

let daysToKeep = process.env.LOG_DAYS_TO_KEEP ? toNumber(process.env.LOG_DAYS_TO_KEEP) : 0;
log4js.configure({
    appenders: {
        error: {
            type: 'file',
            filename: 'logs/error.log',
          // 日志上限100m
            maxLogSize: 104857600,
          // 日志超过上限大小自动备份，保留的备份数量
            backups: 10,
        },
        datafileout: {
            type: 'dateFile',
            filename: 'logs/datafileout.log',
            pattern: '.yyyy-MM-dd',
          // 保留日志的数量
            daysToKeep: daysToKeep,
            keepFileExt: true,
        },
    },
    categories: {
        default: {appenders: ['datafileout'], level: 'debug'},
        error: {appenders: ['error'], level: 'debug'},
    },
    disableClustering: true,
});

const logger = log4js.getLogger('error');
const debugLogger = log4js.getLogger('default');
app.logger = logger;
app.debugLogger = debugLogger;

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
    if (err) throw err;

  // start the server if `$ node server.js`
    if (require.main === module)
        app.start();
});

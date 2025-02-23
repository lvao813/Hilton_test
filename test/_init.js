// process.env.NODE_ENV = 'development';
let util = {};
// util.app = require('../server/server');
util.loopback = require('loopback');
util.rp = require('request-promise');
util.assert = require('assert');

util.serverUrl = 'http://localhost:3000/';
util.systemName = 'system';
util.systemPassword = 'U2FsdGVkX1/O26FF1vjXckgHD+BW9cnUSpgiQdJklys=';

util.token = null;
module.exports = util;

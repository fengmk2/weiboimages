/**
 * config.js
 */

var debug = exports.debug = true;
exports.port = debug ? 8888 : 80;

var tapi = exports.tapi = require('weibo').tapi;

tapi.init('tsina', '4010445928', 'd119f62bfb70a4ba8d9b68bf14d6e45a');

exports.t_users = [{ 
    blogtype: 'tsina',
    oauth_token_key: '25c0dbf4fc42f5e1a309e3f796c558f5',
    oauth_token_secret: '19b7a8ba9437858fd04d08d7226fb265',
    authtype: 'oauth'
}];
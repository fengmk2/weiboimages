/**
 * config.js
 */

var debug = exports.debug = true;
exports.port = debug ? 8080 : 80;

var tapi = exports.tapi = require('weibo').tapi;

tapi.init('tsina', '3434422667', '523f2d0d134bfd5aa138f9e5af828bf9');
tapi.init('tqq', 'b6d893a83bd54e598b5a7c359599190a', '34ad78be42426de26e5c4b445843bb78');

exports.t_users = [{blogtype: 'tsina'}, {blogtype: 'tqq'}];
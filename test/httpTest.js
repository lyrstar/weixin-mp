'use strict';
/**
 * Created by sunpengfei on 2016/10/9.
 */
require('../lib/http-server')({port : 12333});

console.log('http://127.0.0.1:12333');
console.log('http://127.0.0.1:12333/get_token?appId=1');
console.log('http://127.0.0.1:12333/set_token?access_token=1010&appId=1');
console.log('http://127.0.0.1:12333/init_token?appId=wx5b0235cb31f8a27f&appsecret=829e2cb8ca2b0617523e83e37bc96306');
console.log('http://127.0.0.1:12333/create_token?appId=wx5b0235cb31f8a27f&appsecret=829e2cb8ca2b0617523e83e37bc96306');
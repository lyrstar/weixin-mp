'use strict';
const WeChatMP = require('../index');

let options = {
    appID : 'wx5b0235cb31f8a27f',
    appsecret : '829e2cb8ca2b0617523e83e37bc96306',
    initToken : false,
    refresh : false,
    fixToken : false
};

let client = WeChatMP(options);
client._setAccessToken('')
    .then(data => {
        if(data) console.log('access_token设置成功且验证可用');
        else console.log('access_token设置失败或验证不可用');
        return data;
    })
    .catch(error => {
        console.error('access_token设置error', error);
        throw error;
    });
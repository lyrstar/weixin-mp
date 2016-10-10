'use strict';
const WeChatMP = require('../index');

let options = {
    appID : 'wx5b0235cb31f8a27f',
    appsecret : '829e2cb8ca2b0617523e83e37bc96306',
    accessToken : 'ykuGY5Bnm22sSZDBPfSVXbI2AFu8L_aOF-wuJ0q07CGi9d6IFaNXTGDkHwibtFIyEGdMUSKzwouYf7ZTo-B5W88xUimCjeDyv5esKfpSEgsPY1k60atq_6STXRZDS1WHQZTgAGAXGA',
    initToken : false,
    refresh : false,
    fixToken : false
};

let client = WeChatMP(options);
client.getWeChatServerIp().then(d => console.log('test : ', d.ip_list.length)).catch(e => console.error('test : ', e));
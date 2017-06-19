'use strict';
const WeChatMP = require('../index');
const client = WeChatMP({
    appID : 'wx5b0235cb31f8a27f',
    appsecret : '829e2cb8ca2b0617523e83e37bc96306',
    initToken : false,
    refresh : false,
    fixToken : false
});

// setAccessToken();
function setAccessToken() {
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
}

// notify();
function notify() {
    let req = {body: {}, on: {}};
    let res = {send: () => {}};
    //扫码进入公众号
    let xml = '<xml><ToUserName><![CDATA[gh_0a352e9edd49]]></ToUserName>\n<FromUserName><![CDATA[oZZ3KvtmT3xnCIvM4dVMuAWJ1TUA]]></FromUserName>\n<CreateTime>1471403777</CreateTime>\n<MsgType><![CDATA[event]]></MsgType>\n<Event><![CDATA[SCAN]]></Event>\n<EventKey><![CDATA[16]]></EventKey>\n<Ticket><![CDATA[gQGk8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2prVmVxU0xscFUzY0x4UTU2R3VoAAIEG/eyVwMEgDoJAA==]]></Ticket>\n</xml>';
    //关注公众号
    // let xml = '<xml><ToUserName><![CDATA[gh_0a352e9edd49]]></ToUserName><FromUserName><![CDATA[oZZ3KvtmT3xnCIvM4dVMuAWJ1TUA]]></FromUserName> <CreateTime>1471502584</CreateTime> <MsgType><![CDATA[event]]></MsgType> <Event><![CDATA[subscribe]]></Event> <EventKey><![CDATA[qrscene_om_a_1]]></EventKey> <Ticket><![CDATA[gQHN8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL19VWDFwMExsQ0UxeE5HRXhRMm1oAAIE7Ve1VwMEAAAAAA==]]></Ticket> </xml> ';
    req.on = (key, cb) => { if(key === 'data') cb(xml)};
    client.notify(req, res)
        .then(d => {
            console.log('notify:', d);
        })
        .catch(e => {
            console.error(e);
        });
}




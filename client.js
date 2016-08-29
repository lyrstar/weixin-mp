'use strict';
/**
 * 微信公众号接口封装类
 * Created by sunpengfei on 16/8/25.
 */
const http = require('http');
const https = require('https');
const querystring = require('querystring');

var client = {};

//todo 分布式服务器token最好存在数据库
function createClient(appID, appsecret, accessToken){
    client.config = {
        appID : appID,
        appsecret : appsecret,
        accessToken : accessToken
    };
    if(! accessToken){
        setAccessToken();
    }
    return client;
}



////开始开发

//获取接口调用凭据(获取access token)
function setAccessToken(){
    if(client.config.accessToken){
        return;
    }
    let hostname = 'api.weixin.qq.com';
    let path = '/cgi-bin/token?grant_type=client_credential&appid=' + client.config.appID + '&secret=' + client.config.appsecret;
    httpsGet(hostname, 443, path).
        then(d => {
        client.config.accessToken = d.access_token;
    if(! d.expires_in || d.expires_in < 3600) throw d;
    setTimeout(function(){
        setAccessToken();
    }, d.expires_in - 200);
}).
catch(e => console.error(e));

}

client.setAccessToken = (accessToken) => {
    console.log('2222222222222', client.config.accessToken)
    client.config.accessToken = accessToken;
    console.log('3333333333333', client.config.accessToken)
}

client.getAccessToken = () => {
    return client.config.accessToken;
}

//获取微信服务器IP地址


////自定义菜单

////消息管理

////微信网页开发

////素材管理

////用户管理
//获取用户基本信息
client.getUserInfo = (openId) => {
    let hostname = 'api.weixin.qq.com';
    let path = '/cgi-bin/user/info';
    let data = {access_token: client.config.accessToken, openid: openId, lang : 'zh_CN'};
    return httpsGet(hostname, 443, path, data);
}

////帐号管理

//生成带参数的二维码(临时二维码/永久二维码)
client.getTemporaryQrCode = (expire_seconds, scene_id) => {
    let hostname = 'api.weixin.qq.com';
    let path = '/cgi-bin/qrcode/create?access_token=' + client.config.accessToken;
    let data = {"expire_seconds": expire_seconds, "action_name": "QR_SCENE", "action_info": {"scene": {"scene_id": scene_id}}};
    return httpsPost(hostname, 443, path, data);
}

client.getPerpetualQrCode = (scene_id, scene_str, action_name) => {
    action_name = action_name || 'QR_LIMIT_SCENE';
    let hostname = 'api.weixin.qq.com';
    let path = '/cgi-bin/qrcode/create?access_token=' + client.config.accessToken;
    let data = {};
    if(action_name === "QR_LIMIT_STR_SCENE"){
        data = {"action_name": "QR_LIMIT_STR_SCENE", "action_info": {"scene": {"scene_str": scene_str}}};
    }
    if(action_name === "QR_LIMIT_SCENE"){
        data = {"action_name": "QR_LIMIT_SCENE", "action_info": {"scene": {"scene_id": scene_id}}};
    }
    return httpsPost(hostname, 443, path, data);
}

//长链接转短链接接口

//微信认证事件推送
////数据统计

////微信小店

////微信卡券

////微信门店

////微信智能接口

////微信设备功能

////微信多客服功能

////微信摇一摇周边

////微信连Wi-Fi

////微信扫一扫


function httpsGet(hostname, port, path, data){
    return new Promise((resolve, reject) => {
            var options = {
                hostname: hostname,
                port : port || 443,
                path: path,
                method: 'GET'
            };
    if(data) options.path = options.path + '?' + querystring.stringify(data);
    console.log('options:', options);
    var req = https.request(options, (res) => {
            console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
    res.on('data', (d) => {
        d = JSON.parse(d.toString());
    if(d.errcode){
        return reject(d);
    }
    resolve(d);
});
});
req.on('error', (e) => {
    reject(e);
});
req.end();


})
}

function httpsPost(hostname, port, path, data){
    return new Promise((resolve, reject) => {
            var postData = JSON.stringify(data);
    var options = {
        hostname: hostname,
        port : port || 443,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Content-Length': Buffer.byteLength(postData)
        }
    };
    var req = https.request(options, (res) => {
        //console.log('statusCode:', res.statusCode);
        //console.log('headers:', res.headers);
        res.on('data', (d) => {
        d = JSON.parse(d.toString());
    if(d.errcode){
        return reject(d);
    }
    resolve(d);
});
});
req.on('error', (e) => {
    reject(e);
});

req.write(postData);
req.end();
})
}


function httpGet(hostname, port, path, data){
    return new Promise((resolve, reject) => {
            var options = {
                hostname: hostname,
                port : port || 80,
                path: path,
                method: 'GET'
            };
    if(data) options.path = options.path + '?' + querystring.stringify(data);
    var req = http.request(options, (res) => {
            console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
    res.on('data', (d) => {
        d = JSON.parse(d.toString());
    if(d.errcode){
        return reject(d);
    }
    resolve(d);
});
});
req.on('error', (e) => {
    reject(e);
});
req.end();


})
}




module.exports = {
    createClient : createClient
};


'use strict';
/**
 * 微信公众号接口封装类
 * 分布式服务器token需要自行设置
 */
const http = require('http');
const https = require('https');
const querystring = require('querystring');

const USERHONE_API_WEIXIN = 'api.weixin.qq.com';

class WeChatMP{
    /**
     * @param options
     *      appID : string  //微信appid
     *      appsecret : string  //微信secret
     *      accessToken : string    //设置默认accessToken
     *      refresh : boolean   //是否自动刷新accessToken 默认为true,自动刷新
     *      initToken : boolean //是否初始化accessToken  默认为true,初始化
     *      fixToken : boolean //手动设置accessToken时, 若accessToken无效是否自动修正 默认为false,不修正
     */
    constructor(options){
        this.config = {
            appID : options.appID,
            appsecret : options.appsecret,
            initToken : options.initToken,
            refresh : options.refresh,
            fixToken : options.fixToken,
        };
        this.tokenRefreshTime = 0;
        if(options.initToken !== false) this.config.initToken = true;
        if(options.refresh !== false) this.config.refresh = true;
        if(options.fixToken !== true) this.config.fixToken = false;
        if(this.config.initToken) this._createAccessToken();
        if(!this.config.initToken && this.config.refresh) this.__openRefreshAccessToken();
        if(!!options.accessToken) this._setAccessToken(options.accessToken);

    }
    //手动设置accessToken
    _setAccessToken(accessToken){
        this.config.accessToken = accessToken;
        return this._verifyAccessToken();
    }
    //创建accessToken
    _createAccessToken(){
        if(Date.now() - this.tokenRefreshTime < 10000){
            console.error('weixin-mp : _createAccessToken : 获取accessToken 时间间隔小于10s');
        }
        return this.getAccessToken().
            then(d => {
                console.log('weixin-mp : _createAccessToken : ', d);
                this.config.accessToken = d.access_token;
                if(! d.expires_in || d.expires_in < 3600) throw d;
                if(this.config.refresh) this.__openRefreshAccessToken();
                this.tokenRefreshTime = Date.now();
                return d;
            }).
            catch(e => {
                console.error('weixin-mp : _createAccessToken : error : ', e);
                throw e;
            });
    }
    //定时刷新accessToken
    __openRefreshAccessToken(){
        setTimeout(function(){
            this._createAccessToken();
        }, 7000000);
    }
    //验证accessToken是否有效
    _verifyAccessToken(){
        return this.getWeChatServerIp()
            .then(data => {
                if(!data.ip_list) {
                    console.error('weixin-mp : _verifyAccessToken : error : ', data);
                    return false;
                }
                console.log('weixin-mp : _verifyAccessToken : true : ', this.config.accessToken);
                return true;
            })
            .catch(err => {
                console.error('weixin-mp : _verifyAccessToken : error : ', err);
                if(this.config.fixToken && err.errcode === 40001 ){
                    this._createAccessToken();
                    console.error('weixin-mp : _verifyAccessToken : : access_token无效, 已重新获取access_token');
                }
                throw err;
            })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////开始开发
    //获取接口调用凭据(获取access token)
    getAccessToken(){
        let path = '/cgi-bin/token';
        let data = {grant_type : 'client_credential', appid : this.config.appID, secret: this.config.appsecret};
        return httpsGet(USERHONE_API_WEIXIN, 443, path, data);
    }
    //获取微信服务器IP地址
    getWeChatServerIp(){
        let path = '/cgi-bin/getcallbackip';
        let data = {access_token: this.config.accessToken};
        return httpsGet(USERHONE_API_WEIXIN, 443, path, data);
    }



    ////自定义菜单
    //自定义菜单创建接口
    creatMenu(data){
        //1、自定义菜单最多包括3个一级菜单，每个一级菜单最多包含5个二级菜单。
        //2、一级菜单最多4个汉字，二级菜单最多7个汉字，多出来的部分将会以“...”代替。
        //3、创建自定义菜单后，菜单的刷新策略是，在用户进入公众号会话页或公众号profile页时，如果发现上一次拉取菜单的请求在5分钟以前，就会拉取一下菜单，如果菜单有更新，就会刷新客户端的菜单。测试时可以尝试取消关注公众账号后再次关注，则可以看到创建后的效果。
        let path = '/cgi-bin/menu/create?access_token=' + this.config.accessToken;
        return httpsPost(USERHONE_API_WEIXIN, 443, path, data);
    };
    //自定义菜单查询接口
    getMenu(){
        let path = '/cgi-bin/menu/get';
        let data = {access_token: this.config.accessToken};
        return httpsGet(USERHONE_API_WEIXIN, 443, path, data);
    };
    //自定义菜单删除接口
    //自定义菜单事件推送
    //个性化菜单接口
    //获取自定义菜单配置接口

    ////消息管理

    ////微信网页开发

    ////素材管理

    ////用户管理
    //用户标签管理
    //设置用户备注名
    //获取用户基本信息(UnionID机制)
    getUserInfo(openId){
        let path = '/cgi-bin/user/info';
        let data = {access_token: this.config.accessToken, openid: openId, lang : 'zh_CN'};
        return httpsGet(USERHONE_API_WEIXIN, 443, path, data);
    }
    //获取用户列表
    getUserList(next_openid){
        let path = '/cgi-bin/user/get';
        let data = {access_token: this.config.accessToken, lang : 'zh_CN'};
        if(next_openid) data.next_openid = next_openid;
        return httpsGet(USERHONE_API_WEIXIN, 443, path, data);
    }
    //获取用户地理位置
    //黑名单管理

    ////帐号管理

    //生成带参数的二维码(临时二维码/永久二维码)
    getTemporaryQrCode(expire_seconds, scene_id){
        let path = '/cgi-bin/qrcode/create?access_token=' + this.config.accessToken;
        let data = {"expire_seconds": expire_seconds, "action_name": "QR_SCENE", "action_info": {"scene": {"scene_id": scene_id}}};
        return httpsPost(USERHONE_API_WEIXIN, 443, path, data);
    }

    getPerpetualQrCode(scene_id, scene_str, action_name){
        action_name = action_name || 'QR_LIMIT_SCENE';
        let path = '/cgi-bin/qrcode/create?access_token=' + this.config.accessToken;
        let data = {};
        if(action_name === "QR_LIMIT_STR_SCENE"){
            data = {"action_name": "QR_LIMIT_STR_SCENE", "action_info": {"scene": {"scene_str": scene_str}}};
        }
        if(action_name === "QR_LIMIT_SCENE"){
            data = {"action_name": "QR_LIMIT_SCENE", "action_info": {"scene": {"scene_id": scene_id}}};
        }
        return httpsPost(USERHONE_API_WEIXIN, 443, path, data);
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

}


function httpsGet(hostname, port, path, data){
    return new Promise((resolve, reject) => {
        var options = {
            hostname: hostname,
            port : port || 443,
            path: path,
            method: 'GET'
        };
        if(data) options.path = options.path + '?' + querystring.stringify(data);
        var req = https.request(options, (res) => {
            var data = '';
            res.on('data', (d) => {
                data += d;
            });
            res.on("end", function () {
                try{
                    data = JSON.parse(data);
                }catch(e){
                    return reject({errcode : 50000, errmsg : e, data : data});
                }
                if(data.errcode){
                    return reject(data);
                }
                resolve(data);
            });
        });
        req.on('error', e => reject(e));
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
            var data = '';
            res.on('data', (d) => {
                data += d;
            });
            res.on("end", function () {
                try{
                    data = JSON.parse(data);
                }catch(e){
                    return reject({errcode : 50000, errmsg : e, data : data});
                }
                if(data.errcode){
                    return reject(data);
                }
                resolve(data);
            });
        });
        req.on('error', e => reject(e));
        req.write(postData);
        req.end();
    })
}

module.exports = options => new WeChatMP(options);

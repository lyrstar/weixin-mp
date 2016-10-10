'use strict';

const util = require('util');
const url = require('url');
const http = require('http');
const weixin_mp = require('./wechat_mp.js');
const clients = {};
const _clients = {};
const DEFAULT_PORT = 12333;

class HttpServer{

    constructor(options){
        let self = this;
        let port = options.port;

        self.server = new http.Server();

        self.server.on('request',function(req, res){
            let path = url.parse(req.url, true);
            req.query = path.query;
            self.on(path.path).call(self, req, res);
        });
        self.server.listen(port);
    }

    on(path){
        let funcs = {
            '' : this.index,
            'init_token' : this.initToken,
            'create_token' : this.createToken,
            'set_token' : this.setToken,
            'get_token' : this.getToken,
        };
        let p = path.split('/')[1].split('?')[0];
        console.log('path===', path, p);
        if(!! funcs[p]) return funcs[p];
        return this.notFound;
    }

    index(req, res) {
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<h1>weixin-mp</h1>');
        res.end('<a href="https://github.com/rrlyrstar/weixin-mp.git">https://github.com/rrlyrstar/weixin-mp.git</a>');
    }

    createToken(req, res) {
        let appID = req.query.appId,
            appsecret = req.query.appsecret;
        if(! appID || ! appsecret) return response(req, res, '上送数据不完整', 500);
        let option = {
            appID : appID,
            appsecret : appsecret,
            initToken : false,
            refresh : false,
            fixToken : false,
        };
        let WeChatMPClient = weixin_mp(option);
        WeChatMPClient._createAccessToken()
            .then(d => {
                if(! clients[appID]) clients[appID] = {appId : appID};
                clients[appID].access_token = d.access_token;
                clients[appID].expires_time = new Date(Date.now() + (d.expires_in * 1000));
                response(req, res, clients[appID])
            })
            .catch(e => response(req, res, e, 500))

    }

    initToken(req, res){
        let appId = req.query.appId,
            appsecret = req.query.appsecret;
        if(! appId || ! appsecret) return response(req, res, '上送数据不完整', 500);
        _clients[appId] = {};
        _clients[appId].query = {appId : appId, appsecret : appsecret};
        this.createToken(req, res);
        setInterval(() => {
            this.createToken({query : _clients[appId].query}, {});
        }, 7200000)
    }

    setToken(req, res) {
        let appId = req.query.appId,
            access_token = req.query.access_token;
        if(! appId || ! access_token) return response(req, res, '上送数据不完整', 500);
        if(! clients[appId]) clients[appId] = {appId : appId};
        clients[appId].access_token = access_token;
        response(req, res, clients[appId])
    }
    getToken(req, res) {
        let appId = req.query.appId;
        if(! appId) return response(req, res, '上送数据不完整', 500);
        response(req, res, clients[appId])
    }
    notFound(req, res) {
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end('not found !');
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function response(req, res, data, status) {
    let code = status || 200,
        resp = util.inspect({code : code , data : data});
    console.log('response ::: ', resp);
    res.end(resp);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = options => new HttpServer(options);

// new HttpServer({port : DEFAULT_PORT});

// console.log('http://127.0.0.1:12333');
// console.log('http://127.0.0.1:12333/get_token?appId=1');
// console.log('http://127.0.0.1:12333/set_token?access_token=1010&appId=1');
// console.log('http://127.0.0.1:12333/init_token?appId=wx5b0235cb31f8a27f&appsecret=829e2cb8ca2b0617523e83e37bc96306');
// console.log('http://127.0.0.1:12333/create_token?appId=wx5b0235cb31f8a27f&appsecret=829e2cb8ca2b0617523e83e37bc96306');
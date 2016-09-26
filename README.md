#weixin-mp
https://github.com/rrlyrstar/weixin-mp.git
#微信公众号api接口封装

npm install weixin-mp

var weixin_mp = require('weixin-mp');

var client = new weixin_mp(AppId, AppSecret, AccessToken, Refresh);
AppId 微信AppId
AppId 微信AppSecret
AccessToken 微信服务器返回的动态token
Refresh 是否自动刷新AccessToken (默认为true, 自动刷新)

#获取access token
console.log(client.getAccessToken());

#获取用户信息
console.log(client.getUserInfo(openid));
openId : 用户的微信openid


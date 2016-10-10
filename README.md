#weixin-mp
[github主页](https://github.com/rrlyrstar/weixin-mp.git)
#微信公众号api接口封装

***

##安装
npm install weixin-mp

***

##引用
`var weixin_mp = require('weixin-mp');`

***

##初始化
- appID : string  //微信appid
- appsecret : string  //微信secret
- accessToken : string    //设置默认accessToken
- refresh : boolean   //是否自动刷新accessToken
- initToken : boolean //是否初始化accessToken
- fixToken : boolean //手动设置accessToken时, 若accessToken无效是否自动修正

`var client = weixin_mp({
   appID : 'wx5b0235cb31f8a27f',
   appsecret : '829e2cb8ca2b0617523e83e37bc96306',
   accessToken : 'ykuGY5Bnm22sSZDBPfSVXbI2AFu8L_aOF-wuJ0q07CGi9d6IFaNXTGDkHwibtFIyEGdMUSKzwouYf7ZTo-B5W88xUimCjeDyv5esKfpSEgsPY1k60atq_6STXRZDS1WHQZTgAGAXGA',
   initToken : false,
   refresh : false,
   fixToken : false
});`

***

##获取access token
`client.getAccessToken()`

***

##获取用户信息
- openId : 用户的微信openid

`client.getUserInfo(openid)`

***
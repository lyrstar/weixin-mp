#weixin-mp
[github主页](https://github.com/rrlyrstar/weixin-mp.git)
#微信公众号api接口封装

***

##安装
    $ npm install weixin-mp

***

##引用
`var weixin_mp = require('weixin-mp');`

***

##初始化
    var client = weixin_mp({
       appID : appID,
       appsecret : appsecret,
       initToken : false,
       refresh : false,
       fixToken : false
    });
    
#####输入参数
 * Promise.resolve : boolean
 * Promise.reject : error
 * appID : string  //微信appid
 * appsecret : string  //微信secret
 * refresh : boolean   //是否自动刷新accessToken 默认为false,不自动刷新
 * initToken : boolean //是否初始化accessToken  默认为false,不初始化
 * fixToken : boolean //手动设置accessToken时, 若accessToken无效是否自动修正 默认为false,不修正
#####返回参数
 * client : object
 
***

##设置access_token
    client._setAccessToken(access_token)
        .then(data => { return data })
        .catch(error => { throw error })
    
#####输入参数
 * access_token : string  //微信access_token
#####返回参数
 * Promise.resolve : boolean    //true:设置成功且验证可用, false:设置失败或验证不可用
 * Promise.reject : error
 

***

##获取access_token
    client.getAccessToken()
    
#####输入参数
#####返回参数
 * Promise.resolve : object    //{access_token : access_token, expires_in : 7200}
 * Promise.reject : error
***

##获取用户信息
    client.getUserInfo(openid)
    
#####输入参数
 * openId : string  //用户的微信openid,普通用户的标识，对当前公众号唯一
#####返回参数
 * Promise.resolve : object    //{user}
 * Promise.reject : error

***
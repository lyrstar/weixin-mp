#weixin-mp : http-server

[github主页](https://github.com/rrlyrstar/weixin-mp.git)
###### 因为access_token的特殊性,只能保持单线程获取, 所以设置一个单线程的http服务器来保存access_token

####主页
    http://127.0.0.1:12333

####获取access_token
    协议 : http
    请求方式 : get
    示例 : http://127.0.0.1:12333/get_token?appId=1

####设置access_token
    协议 : http
    请求方式 : get
    示例 : http://127.0.0.1:12333/set_token?access_token=1010&appId=1

####初始化access_token
    协议 : http
    请求方式 : get
    示例 : http://127.0.0.1:12333/init_token?appId=wx5b0235cb31f8a27f&appsecret=829e2cb8ca2b0617523e83e37bc96306

####创建access_token
    协议 : http
    请求方式 : get
    示例 : http://127.0.0.1:12333/create_token?appId=wx5b0235cb31f8a27f&appsecret=829e2cb8ca2b0617523e83e37bc96306


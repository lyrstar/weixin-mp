'use strict';
/**
 * Created by sunpengfei on 16/8/25.
 */
const express = require('express');
const router = express.Router();
const callback = require('./callback.js');

router
    .get('/wx/push', (req, res) => {//用于配置微信接口对接验证
        console.log('wx : push : query : ', req.query);
        console.log('wx : push : body : ', req.body);
        res.send(req.query.echostr);
    })
    .post('/wx/push', callback.push)


module.exports = router;

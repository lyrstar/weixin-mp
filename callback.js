'use strict';
/**
 * Created by sunpengfei on 16/8/25.
 */
const parseString = require('xml2js').parseString;

function push(req, res){
    console.log('微信: push : req : body : ', req.body);
    console.log('微信: push : req : query : ', req.query);
    //__testXml(req);//todo 测试环境模拟微信xml推送
    req.on('data', function(data) {
        parseString(data, function (err, result) {
            console.log('微信: push : req : xml : ',result);
            res.send('===');
        });
    });
}


module.exports = {
    push : push
};
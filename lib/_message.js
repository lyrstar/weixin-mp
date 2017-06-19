'use strict';
const xml2js = require('xml2js');

function notify(req) {
    return new Promise((resolve, reject) => {
        req.on('data', function(data) {
            xml2js.parseString(data, function (err, result) {
                if (! result || ! result.xml){
                    reject(Error('没有数据'));
                    return;
                }
                let _xml = {};
                for (let attr in result.xml){
                    if (Array.isArray(result.xml[attr])){
                        _xml[attr] = result.xml[attr][0];
                    }else {
                        _xml[attr] = result.xml[attr];
                    }
                }
                resolve(_xml);
            });
        });
    });
}

module.exports = {
    notify: notify
};
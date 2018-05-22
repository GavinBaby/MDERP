var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var moment = require('moment');
var _ = require('underscore');
var Promise = require("bluebird");
var knex = require('../lib/common/mysqlClient').knex;
var BusinessError = require('../lib/common/errors/businessError');
var util = require('../lib/util.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var filter = require('../lib/filter');
var t_apply_daily = require('../models/table').t_apply_daily;
var multiparty = require('multiparty');
module.exports = function (app) {
    app.use('/oa', router);

    router.post('/saveDaily',function(req,res,next){
        var form = new multiparty.Form();
        console.log(__dirname);
        form.encoding = 'utf-8';
        form.uploadDir = "./upload";
        //设置单文件大小限制
        form.maxFilesSize = 2 * 1024 * 1024;
        //form.maxFields = 1000;  设置所以文件的大小总和
        form.parse(req, function(err, fields, files) {
            if(err){
                console.log('上传失败'+err);
                res.send({err:'上传失败'});
                return ;
            }
            var data = util.getDate(fields);
            data.file=files.file[0].path.substr('7') ;
            data.create_time = moment().format('YYYY-MM-DD HH:mm:ss');
            data.isdeleted = 0;
            t_apply_daily.query().insert(data).then(function (data) {
                res.send({code: 1});
            });
            // console.log(files.files[0].originalFilename);
            // msg.info = '上传成功'
            // msg.len = files.length;
            // res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
        });
    });
};
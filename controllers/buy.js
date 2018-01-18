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
var t_buy_inbill = require('../models/table').t_buy_inbill;
var t_buy_inbill_detail = require('../models/table').t_buy_inbill_detail;
var t_buy_invoice = require('../models/table').t_buy_invoice;
var t_buy_invoice_detail = require('../models/table').t_buy_invoice_detail;
var t_buy_pay = require('../models/table').t_buy_pay;

module.exports = function (app) {
    app.use('/buy', router);


    /*********************前端*********************/

    router.post('/inbill',function (req, res) {
        var main = req.body.main;
        var detail = req.body.detail;

        return knex.max('id as id').from('t_buy_inbill').then(function (data) {
           main.id=data[0].id||0 + 1;
           detail.forEach(function (e) {
                e.id=data[0].id||0 + 1;
            });
            return t_buy_inbill.query().insert(main);
        }).then(function (data) {
            return t_buy_inbill_detail.query().insert(detail);
        }).then(function (data) {
            res.send({code:1});
        }).catch(function (err) {
            console.log("!"+err.message+"!")
            res.send({code:-1,text:err.message});
        })
    });







};
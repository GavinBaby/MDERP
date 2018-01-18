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
var t_b_customer = require('../models/table').t_b_customer;
var t_b_product = require('../models/table').t_b_product;
var t_b_supplier = require('../models/table').t_b_supplier;
var t_dic = require('../models/table').t_dic;

module.exports = function (app) {
    app.use('/base', router);


    /*********************前端*********************/

    router.get('/supplier',function (req, res) {
        t_b_supplier.query().then(function (data) {
            res.send({data:data});
        }).catch(function (err) {
            console.log("!"+err.message+"!")
            res.send('0');
        })
    });
    router.get('/customer',function (req, res) {
        t_b_customer.query().then(function (data) {
            res.send({data:data});
        }).catch(function (err) {
            console.log("!"+err.message+"!")
            res.send('0');
        })
    });
    router.get('/product', function (req, res) {
        t_b_product.query().then(function (data) {
            res.send({data:data});
        }).catch(function (err) {
            console.log("!"+err.message+"!")
            res.send('0');
        })
    });


    router.get('/dic', function (req, res) {
        t_dic.query().then(function (data) {
            res.send({data:data});
        }).catch(function (err) {
            console.log("!"+err.message+"!")
            res.send('0');
        })
    });





};
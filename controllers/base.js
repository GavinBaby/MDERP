﻿var express = require('express');
var router = express.Router();
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
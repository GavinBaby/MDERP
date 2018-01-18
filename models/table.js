var bookshelf = require('../lib/common/mysqlClient').bookshelf;

var table = {};

table.t_b_customer = bookshelf.Model.extend({
    tableName: 't_b_customer'
});

table.t_b_product = bookshelf.Model.extend({
    tableName: 't_b_product'
});

table.t_b_supplier = bookshelf.Model.extend({
    tableName: 't_b_supplier'
});



table.t_buy_inbill = bookshelf.Model.extend({
    tableName: 't_buy_inbill'
});

table.t_buy_inbill_detail = bookshelf.Model.extend({
    tableName: 't_buy_inbill_detail'
});

table.t_buy_invoice = bookshelf.Model.extend({
    tableName: 't_buy_invoice'
});

table.t_buy_invoice_detail = bookshelf.Model.extend({
    tableName: 't_buy_invoice_detail'
});

table.t_buy_pay = bookshelf.Model.extend({
    tableName: 't_buy_pay'
});



table.t_dic = bookshelf.Model.extend({
    tableName: 't_dic'
});

module.exports = table;

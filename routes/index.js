var express = require('express');
var router = express.Router();
var url = require('url');
var request = require('request');

router.get('/', function(req, res, next) {
    var receitaws = 'https://www.receitaws.com.br/v1/cnpj/';
    var params = url.parse(req.url, true).query;
    var cnpjParam = params.cnpj;
    if (cnpjParam == '' || cnpjParam == undefined) {
        return res.render('index', { title: 'receitaws-data' });
    }
    var cnpj = '';
    if (cnpjParam.includes('.') || cnpjParam.includes('/') || cnpjParam.includes('-')) {
        cnpj = cnpjParam.replace(/\./g, '');
        cnpj = cnpj.replace(/\//g, '');
        cnpj = cnpj.replace(/-/g, '');
    } else {
        cnpj = cnpjParam;
    }
    var queryReceitaws = receitaws+cnpj;
    request(queryReceitaws, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            res.status(200).send(info);
        }
    });
});

module.exports = router;
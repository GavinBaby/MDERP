var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
module.exports = function (app) {
    app.use('/upload', router);

    router.get('/:file', function (req, res) {
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        fs.readFile('./upload/'+req.params.file, function(err, file) {
            if (err) {
                console.log(err);
                return;
            }else {
                res.write(file,'binary');
                res.end();
            }
        });
    });


    router.get('/down/:file', function(req, res, next) {
        // 实现文件下载
        var fileName = req.params.file;
        var filePath ='./upload/'+req.params.file;
        var stats = fs.statSync(filePath);
        if(stats.isFile()){
            res.set({
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment; filename='+fileName,
                'Content-Length': stats.size
            });
            fs.createReadStream(filePath).pipe(res);
        } else {
            res.end(404);
        }
    });




};
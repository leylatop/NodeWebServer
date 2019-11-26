// 导入http模块
var http = require('http');
// 导入文件系统
var fs = require('fs');

var url = require('url');

// 第一种方法
//设置文件的根目录，可以修改为个人的自定义目录。
var documentRoot = 'E:/learnCode/WebServer';

// 第二种方法
//设置文件的根目录，可以修改为个人的自定义目录。
var path = require('path');
var workDir = path.resolve('.');

// 创建http server服务器，传入回调函数
var server = http.createServer(function(req,res) {
    // 回调函数接收 req 和 res 对象
    // 打印请求方式和请求地址
    console.log(req.method + ': ' + req.url)
    // 请求地址
    var url = req.url;
    console.log(req.url)
    // 页面跳转
    if (url.indexOf('.html') > -1) {

        var file = documentRoot + url;
        var file = path.join(workDir, url);
        // 读文件
        fs.readFile(file,function(err,data) {
            if(err){
                res.writeHeader(404,{
                    'content-type':'text/html;charset="utf-8"'
                });
                res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
                res.end();
            }else{ 
                // 写入状态码，同时设置content-type编码方式
                res.writeHeader(200,{
                    'content-type':'text/html;charset=utf-8"'
                });
                res.write(data);
                res.end();
            }
        });
    } 
    // 请求接口
    else {
        console.log(url.toUpperCase(url));
        res.writeHeader(200,{
            'content-type':'text/html;charset="utf-8"'
        });
        res.write(url);
        res.end();
    }
}).listen(8080);//设置的端口号，建议为6000以上。
console.log('服务器开启成功');
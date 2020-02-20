const express = require('express');
const bodyParser = require('body-parser');

// 创建server
const app = express();
// 模板数据
const comments = require('./data/comments')
// 提供静态资源服务,开放资源
app.use('/public/', express.static('./public/'));

// 配置body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 配置使用art-template模板引擎
app.engine('html',require('express-art-template'));

app.get('/', function(req,res) {
    console.log('收到客户端请求');
    // express默认向views目录找文件
    
    res.render('index.html', {
        comments
    });
});

app.get('/post', function(req,res) {
    res.render('post.html');
});

app.post('/post', (req,res) => {
    // req.query只能拿get请求参数
    // req.body拿到post请求参数
    const comment = req.body;
    comments.unshift(comment);
    // 重定向
    res.redirect('/');
})

app.get('/discuss', (req,res) => {
    const comment = req.query;
    comments.unshift(comment);
    // 重定向
    res.redirect('/');
})

app.listen(8888, function() {
    console.log('express app is running http://127.0.0.1:8888');
});
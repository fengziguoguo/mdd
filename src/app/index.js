const Koa = require('koa');
const parser = require('koa-bodyparser');
const userrouter = require('../router/user-router');
const loginrouter = require('../router/login-router');
const momentrouter = require('../router/moment-router');
const commentrouter = require('../router/comment-router');
const filerouter = require('../router/file-router');
// const userouter = require('../router/index')
const dispose = require('./dispose');
const app = new Koa();

app.use(parser())
    // userouter(app)
app.use(loginrouter.routes()); //登录相关接口
app.use(loginrouter.allowedMethods());

app.use(userrouter.routes()); // 用户信息相关列表接口
app.use(userrouter.allowedMethods());

app.use(momentrouter.routes()); //关于动态相关的接口
app.use(momentrouter.allowedMethods());

app.use(commentrouter.routes()); //关于评论动态相关的接口
app.use(commentrouter.allowedMethods());

app.use(filerouter.routes()); //关于文件上传相关接口
app.use(filerouter.allowedMethods());

app.on('error', dispose)
module.exports = app;
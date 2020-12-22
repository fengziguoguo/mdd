const Router = require('koa-router');
const { create, avatarinfo } = require('../controller/user.controller');
const { verifyuser, pwdhandle } = require('../middleware/user-middleware');
const userrouter = new Router({ prefix: '/users' });

userrouter.post('/', verifyuser, pwdhandle, create);
userrouter.get('/:id/avatar', avatarinfo); //读取图片信息




module.exports = userrouter;
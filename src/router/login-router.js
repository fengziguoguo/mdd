const Router = require('koa-router');
const { loginhandle, success } = require('../controller/login.controller.js');
const { verifyuser, verifyauth } = require('../middleware/login-middleware')
const loginrouter = new Router();


loginrouter.post('/login', verifyuser, loginhandle);

loginrouter.get('/test', verifyauth, success);




module.exports = loginrouter;
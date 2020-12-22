const Router = require('koa-router');
const { create } = require('../controller/moment.controller');
const { verifyauth, verifyPermission } = require('../middleware/login-middleware');
const { momentinfo, momentlist, momentupdate } = require('../controller/momentinfo.controller')


const momentrouter = new Router({ prefix: "/moment" });

momentrouter.post('/', verifyauth, create); //用户发表动态
momentrouter.get('/:momentId', momentinfo); //用户单条心情动态查询
momentrouter.get('/', momentlist); //用户列表，分页查询

/*
verifyPermission() 这个方法 返回的是一个函数，传递过去的参数是 需要查询的某一个数据表
用户修改动态信息
*/
momentrouter.patch('/:id', verifyauth, verifyPermission('moment'), momentupdate)

module.exports = momentrouter;
const Router = require('koa-router');
const { verifyauth } = require('../middleware/login-middleware');

const { avatarhandler } = require('../middleware/file-middleware')
const { avatarcreate } = require('../controller/file.controller');

const filerouter = new Router({ prefix: '/updata' });


filerouter.post('/avatar', verifyauth, avatarhandler, avatarcreate);

module.exports = filerouter;
const Router = require('koa-router');
const { verifyauth, verifyPermission } = require('../middleware/login-middleware')
const { create, reply, commentupdate } = require('../controller/comment.conctroller')
const commentrouter = new Router({ prefix: '/comment' });

commentrouter.post('/', verifyauth, create); //评论动态
commentrouter.post('/:commentId/reply', verifyauth, reply); //评论别人的评论

commentrouter.patch('/:id', verifyauth, verifyPermission('comment'), commentupdate)

module.exports = commentrouter;
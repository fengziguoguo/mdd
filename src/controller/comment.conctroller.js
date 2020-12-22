const pool = require('../service/user.service');
const select = require('../service/selectfun');
const { commentpublish, commentreply, update } = require('../service/selectfun')
class CommentController {
    async create(ctx, next) {
        // 当前用户id:
        const user_id = ctx.user.id;
        // 要评论  动态id  和 评论内容
        const { moment_id, content } = ctx.request.body;
        // ctx.body = `
        // 当前用户ID：${user_id}
        // 当前评论的动态ID:${momentId}
        // 当前评论内容:${content}
        // `;
        const res = await commentpublish(content, user_id, moment_id, pool);
        ctx.body = res;
    };
    async reply(ctx, next) {
        const user_id = ctx.user.id;
        const { id } = ctx.params;
        const { content, moment_id } = ctx.request.body;
        const res = await commentreply(content, user_id, moment_id, id, pool);
        ctx.body = res;
    };

    async commentupdate(ctx, next) {
        let { id } = ctx.params;
        const user_id = ctx.user.id;
        const content = ctx.request.body.content;
        // console.log(id, user_id, content);
        const res = await update(id, user_id, content, pool);
        ctx.body = res;
    }
}

module.exports = new CommentController();
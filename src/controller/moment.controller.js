const pool = require('../service/user.service')
const { SelectUserContent } = require('../service/selectfun')
class momentController {
    async create(ctx, next) {
        // 拿到用户id 发表的内容  存到对应数据库
        const { id } = ctx.user;
        const content = ctx.request.body.content;
        const res = await SelectUserContent(id, content, pool)
            // console.log(res);
        ctx.body = '发表动态成功';
    }
}


module.exports = new momentController()
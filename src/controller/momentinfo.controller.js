const pool = require('../service/user.service');
const { SelectMomentInfo, SelectMomentPages, SelectMoment, Momentupdate } = require('../service/selectfun')
class momentinfo {
    async momentinfo(ctx, next) {
        // 查询心情动态 的单条数据
        const { momentId } = ctx.params;
        const res = await SelectMomentInfo(momentId, pool);
        // console.log(res[0]);
        ctx.body = res[0];
    }

    async momentlist(ctx, next) {
        // 用户发表的心情 分页查询
        let { size, offset } = ctx.query;
        // size = parseInt(size);
        // offset = parseInt(offset);
        // offset = size * (offset - 1);
        // size = toString(size);
        // offset = toString(offset);
        const res = await SelectMomentPages(size, offset, pool);
        // console.log(res);
        ctx.body = res;
    }

    async momentupdate(ctx, next) {
        // 用户修改动态
        const user_id = ctx.user.id;
        const { content } = ctx.request.body;
        const { id } = ctx.params;
        const res1 = await Momentupdate(content, id, pool); //修改心情动态
        const res = await SelectMoment(user_id, pool); //修改之后查询当前所有动态
        ctx.body = res;

        // ctx.body = '你有权限了'
    }
}


module.exports = new momentinfo()
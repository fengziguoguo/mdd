const errortype = require('../constants/constants');
const pool = require('../service/user.service');
const select = require('../service/selectfun');
const md5pwd = require('../utils/password-handle')
class UserMiddleware {
    async verifyuser(ctx, next) { //用户验证中间件
        // 拿到用户信息 
        const { username, password } = ctx.request.body;

        // 2判断用户是否为空，为空则抛出事件 和错误信息
        if (!username || !password) {
            const error = new Error(errortype.USER_OR_PWD_IS_NOT_NULL);
            return ctx.app.emit('error', error, ctx);
        }

        // 判断用户是否存在：
        const res = await select.selectfun(username, pool);
        if (res.length) {
            const error = new Error(errortype.USER_IS_EXISTS);
            return ctx.app.emit('error', error, ctx);
        }
        await next();
    };
    async pwdhandle(ctx, next) { //密码加密中间件
        const { password } = ctx.request.body;
        ctx.request.body.password = md5pwd(password);
        await next();
    }


}


module.exports = new UserMiddleware()
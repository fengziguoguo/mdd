const errortype = require('../constants/constants');
const md5pwd = require('../utils/password-handle');
const select = require('../service/selectfun');
const pool = require('../service/user.service');
const jwt = require('jsonwebtoken');

const authservice = require('../service/auth.service')
class LoginMiddleWare {
    async verifyuser(ctx, next) { //用户验证中间件
        // 拿到用户信息 
        const { username, password } = ctx.request.body;
        // 2判断用户是否为空，为空则抛出事件 和错误信息
        if (!username || !password) {
            const error = new Error(errortype.USER_OR_PWD_IS_NOT_NULL);
            return ctx.app.emit('error', error, ctx);
        }

        // 3判断用户是否存在：
        const res = await select.selectfun(username, pool);
        ctx.user = res[0]; //把查询到的内容挂到ctx上，最后颁发令牌的时候使用它
        if (!res.length) {
            const error = new Error(errortype.USER_IS_NOT_EXISTS);
            return ctx.app.emit('error', error, ctx);
        }
        // 4判断密码是否正确
        ctx.request.body.password = md5pwd(password);
        const resuserpwd = await select.Selectuserpwd(ctx.request.body, pool);
        if (!resuserpwd.length) {
            const error = new Error(errortype.USER_OR_PASSWORD_ERROR);
            return ctx.app.emit('error', error, ctx);
        }
        await next();
    };

    // 中间件token令牌 的验证
    async verifyauth(ctx, next) {
        // 获取请求头中的授权令牌
        if (!ctx.header.authorization) {
            const error = new Error(errortype.Token_is_null);
            return ctx.app.emit('error', error, ctx);
        }
        const authorization = ctx.header.authorization.replace("Bearer ", "");

        // 解析令牌 捕获异常，如果没有异常则next 如果有异常则报错
        try {
            const res = jwt.verify(authorization, errortype.public_kes);
            ctx.user = res;
            await next();
        } catch (error) {
            console.log(error);
            ctx.body = "token令牌失效辣"
        }
    }

    // 这个函数方法是 权限认证
    verifyPermission(tablename) {
        return async(ctx, next) => {
            // 验证权限需要的 获取参数。登录用户的ID  和传递过来的参数的ID
            const user_id = ctx.user.id; //用户登录的id
            const { id } = ctx.params; //查询表格的主键ID
            console.log(id);
            // const 
            const [ispermission] = await authservice.checkresource(tablename, id, user_id);
            if (ispermission.length) {
                await next()
            } else {
                const error = new Error(errortype.VerifyPermission);
                return ctx.app.emit('error', error, ctx)
            }
        }
    }

}

module.exports = new LoginMiddleWare()
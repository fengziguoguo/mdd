const jwk = require('jsonwebtoken');
const constants = require('../constants/constants')

class loginctrl {
    async loginhandle(ctx, next) {
        const { id, name } = ctx.user

        // console.log(constants.public_kes);
        // 颁发令牌 步奏。需要用到第三方库 jsonwebtoken
        // 定义HS256校验字符串
        // jwk.sign(传递参数payload,对称加密令牌，{expiresIn 有效时间,alg 加密方式默认HS256}) 颁发令牌
        const token = jwk.sign({ id, name }, constants.public_kes, {
            expiresIn: 60 * 60 * 24
        })

        // 把令牌返回到ctx，body上
        ctx.body = {
            id,
            name,
            token
        };
        // ctx.body = `用户:${ctx.request.body.username},欢迎您`
    }
    async success(ctx, next) {
        ctx.body = {
            msg: '授权成功',
            token: ctx.result
        }
    }
}

module.exports = new loginctrl();
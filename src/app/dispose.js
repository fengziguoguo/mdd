const errortype = require('../constants/constants')
const dispse = (error, ctx) => {
    let status, message;
    switch (error.message) {
        case errortype.USER_OR_PWD_IS_NOT_NULL:
            status = 405;
            message = '账号密码不能为空';
            break;
        case errortype.USER_IS_EXISTS:
            status = 409;
            message = '用户名已存在';
            break;
        case errortype.USER_IS_NOT_EXISTS:
            status = 410;
            message = '用户名不存在';
            break;
        case errortype.USER_OR_PASSWORD_ERROR:
            status = 410;
            message = '账号或者密码错误';
            break;
        case errortype.Token_is_null:
            status = 410;
            message = '请先登录';
            break;
        case errortype.VerifyPermission:
            status = 410;
            message = '您没有此权限操作';
            break;
        default:
            status = 404;
            message = '没有找到网页';
    }
    ctx.status = status;
    ctx.body = message;

}


module.exports = dispse
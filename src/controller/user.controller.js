const fs = require('fs')
const pool = require('../service/user.service');
const select = require('../service/selectfun');
class Usercontroller {
    async create(ctx, next) {
        const user = ctx.request.body;
        const res = await select.selectcreate(user, pool);
        ctx.body = res;
    };
    async avatarinfo(ctx, next) {
        const user_id = ctx.params.id;
        const [res] = await select.avatarlook(user_id, pool);
        console.log(res.filename);
        ctx.response.set('content-type', res.mimetype); //set浏览器 响应的数据类型
        // ctx.body = res;
        ctx.body = fs.createReadStream(`./updata/avatar/${res.filename}`);
    }
}

module.exports = new Usercontroller();
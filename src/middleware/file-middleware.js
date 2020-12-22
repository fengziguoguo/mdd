const multer = require('koa-multer')

// multer是处理 文件的三方库，把我们上传的文件解析出来。
// 在下一个中间件使用ctx.req.file 就可以拿到我们上传的文件的信息
const avatarupdata = multer({
    dest: './updata/avatar' //告诉我们上传的文件放在服务器何处。
})

const avatarhandler = avatarupdata.single('avatar');

module.exports = { avatarhandler };
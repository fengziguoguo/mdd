const { avatarsave } = require('../service/fileupload')
class FileController {
    async avatarcreate(ctx, next) {
        const { id } = ctx.user;
        const { filename, mimetype, size } = ctx.req.file;
        const res = await avatarsave(filename, mimetype, size, id);
        ctx.body = res;
    }
}

module.exports = new FileController()
const pool = require('../service/user.service');

class fileupload {
    async avatarsave(filename, mimetype, size, user_id) {
        const statement = `insert into avatar (filename,mimetype,size,user_id) values(?,?,?,?)`;
        const [result] = await pool.execute(statement, [filename, mimetype, size, user_id]);
        return result
    }
}

module.exports = new fileupload();
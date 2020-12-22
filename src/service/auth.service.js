// 权限查询的 数据库查询
const pool = require('../service/user.service')
class AuthServier {
    // tablename 代表查询的数据表
    // id 数据表中主键ID 
    // userId 这个是用户登录，就自带的。
    async checkresource(tableName, id, userId) {
        const statement = `select * from ${tableName} where id=? and user_id=?`;
        const res = await pool.execute(statement, [id, userId]);
        return res
    }
}
module.exports = new AuthServier()
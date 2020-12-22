class Select {
    async selectfun(username, pool) { //查询用户名
        const statement = `select * from users where name=?`
        const res = await pool.execute(statement, [username])
        return res[0];
    }
    async selectcreate(user, pool) { //注册用户密码
        const statement = `insert into users (name,password) values (?,?)`
        const res = await pool.execute(statement, [user.username, user.password])
        return res[0];
    }
    async Selectuserpwd(user, pool) { //验证账户和密码是否存在
        const statement = `select * from users where name=? and password=?`
        const res = await pool.execute(statement, [user.username, user.password])
        return res[0];
    }
    async SelectUserContent(id, content, pool) { //存储用户的发表的心情或者动态
        const statement = `insert into moment (user_id,content) values (?,?)`
        const res = await pool.execute(statement, [id, content])
        return res[0];
    }
    async SelectMomentInfo(id, pool) { //根据心情库id查询 用户发表的心情动态
        const statement = ` SELECT m.id id, m.content content,m.createAt createtime,m.updateAT updatetime,
        JSON_OBJECT('id',u.id,'name',u.name) user FROM moment m
        LEFT JOIN users u ON m.user_id=u.id WHERE m.id=? `;
        const res = await pool.execute(statement, [id])
        return res[0];
    }
    async SelectMomentPages(limit, offset, pool) {
        const statement = `SELECT
        m.id id, m.content content,m.createAt createtime,m.updateAT updatetime,
        JSON_OBJECT('id',u.id,'name',u.name) user
        FROM moment m
        LEFT JOIN users u ON m.user_id=u.id
        limit ? offset ?`
        const res = await pool.execute(statement, [limit, offset])
        return res[0];
    }

    async SelectMoment(id, pool) { // 用户动态查询
        const statement = `SELECT
        u.id id,u.name author,  
        JSON_ARRAYAGG(JSON_OBJECT('moment_id',m.id,'content',m.content,'createtime',m.createAt,'updatetime',m.updateAt ))  momentinfo
        FROM users u
        LEFT JOIN moment m ON u.id=m.user_id
        WHERE u.id=?
        GROUP BY u.id`
        const res = await pool.execute(statement, [id])
        return res[0];
    }

    async Momentupdate(content, id, pool) { // 用户动态查询
        const statement = `update moment set content=? where id=?;`
        const res = await pool.execute(statement, [content, id])
        return res[0];
    }

    async commentpublish(content, user_id, moment_id, pool) { // 用户动态评论
        const statement = `insert into comment (content,user_id,moment_id) values(?,?,?);`
        const res = await pool.execute(statement, [content, user_id, moment_id])
        return res[0];
    }

    async commentreply(content, user_id, moment_id, comment_id, pool) { // 用户评论别人的评论
        const statement = `insert into comment (content,user_id,moment_id,comment_id) values(?,?,?,?);`
        const res = await pool.execute(statement, [content, user_id, moment_id, comment_id])
        return res[0];
    }

    async update(id, user_id, content, pool) {
        const statement = `update comment set content=? where id=? and user_id=?`;
        const res = await pool.execute(statement, [content, id, user_id]);
        return res[0]
    }

    async avatarlook(user_id, pool) { //查看头像
        const statement = `select * from avatar where user_id=?`;
        const [res] = await pool.execute(statement, [user_id]);
        console.log(res);
        return res
    }
}

module.exports = new Select();
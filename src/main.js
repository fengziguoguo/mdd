const app = require('./app/index');
const config = require('./app/config');
const pools = require('./service/user.service')



app.listen(config.APP_ROOT, err => {
    if (err) console.log(err);
    console.log(`服务器${config.APP_ROOT},我在main.js下`);
})
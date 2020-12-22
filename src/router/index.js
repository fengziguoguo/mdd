const fs = require('fs');


const userouter = (app) => {
    fs.readdirSync(__dirname).forEach(file => {
        if (file === 'index.js') return;
        app.use(require(`./${file}`).routes());
        app.use(require(file).allowedMethods());
    })
}

module.exports = userouter;
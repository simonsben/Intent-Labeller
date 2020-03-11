const { app, root_path } = require('./server');
const green_lock = require('greenlock-express');

const config_dir = path.join(__dirname, 'greenlock.d/');

green_lock.init({
    packageRoot: __dirname,
    configDir: config_dir,
    cluster: false
})
.server(app);

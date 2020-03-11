const { app, root_path } = require('./server');
const green_lock = require('greenlock-express');
const path = require('path');

const config_dir = path.join(__dirname, 'greenlock.d/');
const package_dir = path.join(__dirname, '../');

green_lock.init({
    packageRoot: package_dir,
    configDir: config_dir,
    maintainerEmail: '15bs5@queensu.ca',
    cluster: false
})
.serve(app);

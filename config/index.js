var config = {};

switch (process.env.NODE_ENV) {
    case 'development':
        config = require('./config-dev.json');
    break;
    case 'production':
        config = require('./config-prod.json');
    break;
    case 'travisci':
        config = require('./config-travisci.json');
    break;
    case 'koding':
        config = require('./config-koding.json');
    break;
    default:
        config = require('./config-local.json');
        process.env.NODE_ENV = 'development';
    break;
}

config.envflag = process.env.NODE_ENV;

console.log("=========================================");
console.log("Env", config.envflag);
console.log("IP", config.app.domain);
console.log("Port", config.app.port);
console.log("=========================================");


module.exports = config;

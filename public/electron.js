const development = require('./electron-development');
const production = require('./electron-production');

const isDev = process.env.NODE_ENV === "development";

if(isDev){
    development.start();
} else {
    production.start();
}
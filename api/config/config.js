/**
 * Main Configuration File
 */
const environment = 'local';

const config = {
    environment: environment,
    // hostname: 'localhost',
    // port: process.env.port || '3000',
    // dbhost: 'localhost',
    // dbname: 'node_test',
    // dbuser: 'root',
    // dbpass: '',
    // dbConnectionLimit: 20,
    mongo: {
        url: 'mongodb://localhost:27017/test_etech',
    }
}
module.exports = config;
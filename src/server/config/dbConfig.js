/* Configuration for the database connection. */

const config = {
    user: 'test',
    password: 'test',
    server: 'localhost',
    database: 'CPSC304',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instanceName: 'SQLEXPRESS'
    },
    port: 1433
}

module.exports = config;
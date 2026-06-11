const { Pool } = require('pg');

// Conexão com o banco de dados PostgreSQL
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'afya_api',
    user: 'postgres',
    password: 'postgres',
});

module.exports = pool;
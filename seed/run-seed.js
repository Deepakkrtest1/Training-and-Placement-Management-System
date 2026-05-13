const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function run() {
  const sqlPath = path.join(__dirname, 'placement_seed.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Deepak@123',
    multipleStatements: true
  });

  try {
    await connection.query(sql);
    console.log('Database seeded successfully.');
  } finally {
    await connection.end();
  }
}

run().catch((error) => {
  console.error('Failed to seed database.');
  console.error(error.message);
  process.exit(1);
});

const Database = require('better-sqlite3');
const db = new Database('database.sqlite');
const row = db.prepare("SELECT value FROM settings WHERE key = 'all_products_banner'").get();
console.log(JSON.stringify(row));
db.close();

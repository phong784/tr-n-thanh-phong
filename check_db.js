import Database from 'better-sqlite3';
const db = new Database('database.sqlite');
const rows = db.prepare("SELECT name, image FROM products WHERE image LIKE '%/uploads/%'").all();
console.log(JSON.stringify(rows, null, 2));
db.close();

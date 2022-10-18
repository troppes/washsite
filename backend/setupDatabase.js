import Database from 'better-sqlite3';
import * as bcrypt from 'bcrypt';

const db = new Database('database.db', { verbose: console.log });
const saltRounds = 10;

db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT, password TEXT, type TEXT)");
db.exec("CREATE TABLE IF NOT EXISTS machines (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, status TEXT)");


const insert = db.prepare('INSERT INTO users (username, password, type) VALUES (?, ?, ?)');

const transactions = db.transaction((users) => {
    for (const user of users){
        bcrypt.hash(user.password, saltRounds, function (err, hash) {
            insert.run(user.username, hash, user.type);
        });
    }
});

transactions([
    { username: 'flo', password: 'test', type: 'admin' },
    { username: 'washer', password: 'washer', type: 'washer' },
    { username: 'display', password: 'display', type: 'display' }
]);


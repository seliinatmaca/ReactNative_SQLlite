import { Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const db = SQLite.openDatabase({
  name: 'userDB',
  createFromLocation: '~user.db',
});

const createTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,surname VARCHAR(30),name VARCHAR(30),phone VARCHAR(30),age VARCHAR(30),photo VARCHAR(30))',
        [],
        () => resolve(),
        (_, error) => reject(error),
      );
    });
  });
};

const getUsers = () => {
  db.transaction(txn => {
    txn.executeSql(
      'SELECT * FROM users ORDER BY id DESC',
      [],
      (sqlTxn, res) => {
        let length = res.rows.length;
        let result = [];
        if (length > 0) {
          for (let i = 0; i < length; i++) {
            let item = res.rows.item(i);
            result.push(item);
          }
        
        }
      },
      error => {
        console.log('Kullanıcılar hata ' + error.message);
      },
    );
  });
};
function deleteUser(userId) {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM users WHERE id = ?',
      [userId],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('Kullanıcı başarıyla silindi.');
      
        } else {
          console.log('Kullanıcı silinemedi.');
        }
      }
    );
  });
}

export {db, createTable};

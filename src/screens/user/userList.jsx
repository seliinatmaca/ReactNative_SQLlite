
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, FlatList, RefreshControl} from 'react-native';
import {screenStyle} from '../../styles/screenStyle';
import FlatActionButton from '../../components/uı/FlatActionButton';
import UserCard from '../../components/user/userCard';
import {USERADD} from '../../utils/routes';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'userDB',
});

const UserList = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  const createUsersTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, surname VARCHAR(30),name VARCHAR(30),phone VARCHAR(30),age VARCHAR(10),photo VARCHAR(20))',
        [],
        (sqlTxn, res) => {
          console.log('tablo oluşturuldu');
        },
        error => {
          console.log('tablo oluşturma hatası ' + error.message);
        },
      );
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
            setUsers(result);
          }
        },
        error => {
          console.log('Kullanıcılar hata ' + error.message);
        },
      );
    });
  };
  useEffect(() => {
    createUsersTable();
    getUsers()
  }, []);

  return (
    <SafeAreaView style={screenStyle.safeAreaContainer}>
      <View style={screenStyle.container}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={getUsers} />
          }
          data={users}
          renderItem={({item}) => <UserCard item={item} />}
        />
        <FlatActionButton onPress={() => navigation.navigate(USERADD)} />
      </View>
    </SafeAreaView>
  );
};

export default UserList;

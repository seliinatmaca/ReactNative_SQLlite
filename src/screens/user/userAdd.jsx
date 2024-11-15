
import React, {useState} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {screenStyle} from '../../styles/screenStyle';
import CustomInput from '../../components/uı/customInput';
import CustomButton from '../../components/uı/cusstomButton';
import {useNavigation} from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import Colors from '../../theme/colors';

const db = SQLite.openDatabase({
  name: 'userDB',
  createFromLocation: '~user.db',
});
const UserAdd = () => {
  const [name, setName] = useState('');
  const [surname, setsurname] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [age, setAge] = useState('');
  const navigation = useNavigation();
  const insertUser = () => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO users (surname,name,phone,age,photo) VALUES (?,?,?,?,?)',
        [surname, name, phone, age, photo],
        (sqlTxn, res) => {
          console.log(`${surname} ekleme başarılı`);
          Alert.alert(
            'İşlem Başarılı',
            `${name} ${surname} kişisi başarılı bir şekilde eklendi.`,
            [
              {
                text: 'Tamam',
                onPress: () => navigation.goBack(),
              },
              {
                text: 'Vazgeç',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ],
          );
        },
        error => {
          Alert.alert(
            'İşlem Başarısız',
            `${name} ${surname} kişisi eklenirken bir hata oluştu.`,
            [
              {
                text: 'Tamam',
                onPress: () => navigation.goBack(),
              },
              {
                text: 'Vazgeç',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ],
          );
        },
      );
    });
  };
  return (
    <View style={screenStyle.container}>
      <ScrollView>
        <CustomInput
          placeholder="Name"
          title="Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <CustomInput
          onChangeText={text => setsurname(text)}
          placeholder="Surname"
          title="Surname"
          value={surname}
        />
        <CustomInput
          onChangeText={text => setPhone(text)}
          placeholder="Phone"
          title="Phone"
          value={phone}
        />
        <CustomInput
          onChangeText={text => setAge(text)}
          placeholder="Age"
          title="Age"
          value={age}
        />
        <CustomButton bgColor={Colors.GREEN} onPress={() => insertUser()} title={'SAVE'} />
      </ScrollView>
    </View>
  );
};
export default UserAdd;

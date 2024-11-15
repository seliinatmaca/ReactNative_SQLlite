
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
const UserUpdate = ({route}) => {
  const {user} = route.params;
  const [name, setName] = useState(user.name);
  const [surname, setsurname] = useState(user.surname);
  const [phone, setPhone] = useState(user.phone);
  const [photo, setPhoto] = useState(user.photo);
  const [age, setAge] = useState(user.age);
  const navigation = useNavigation();
  const updateUser = () => {
    db.transaction(txn => {
      txn.executeSql(
        'UPDATE users SET surname = ?, name = ?, phone = ?, age = ?, photo = ? WHERE id = ?',
        [surname, name, phone, age, photo, user.id],
        (sqlTxn, res) => {
          console.log(`${surname} güncelleme başarılı`);
          Alert.alert(
            'İşlem Başarılı',
            `${name} ${surname} kişisi başarılı bir şekilde güncellendi.`,
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
            `${name} ${surname} kişisi güncellenirken bir hata oluştu.`,
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
        <CustomButton
          bgColor={Colors.BLUE}
          onPress={() => updateUser()}
          title={'UPDATE'}
        />
      </ScrollView>
    </View>
  );
};
export default UserUpdate;

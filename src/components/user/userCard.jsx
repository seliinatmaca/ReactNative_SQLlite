
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../theme/colors';
import Avatar from '../uı/avatar';
import {Call, Edit} from 'iconsax-react-native';
import {compareUserName} from '../../utils/functions';
import {useNavigation} from '@react-navigation/native';
import {USERUPDATE} from '../../utils/routes';


const UserCard = ({item}) => {
  const navigation = useNavigation();
  const callPhone = () => {
    const url = `tel:${item.phone}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        alert('Desteklenmeyen Telefon Numarası');
      }
    });
  };
  return (
    <Pressable style={styles.container}>
      <View style={styles.imageContainer}>
        <Avatar photo={item.photo} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {compareUserName(item.name, item.surname)}
        </Text>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>
      <View style={styles.callContainer}>
        <TouchableOpacity onPress={callPhone}>
          <Call size={30} color={Colors.GREEN} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(USERUPDATE, {user: item})}>
          <Edit size={30} color={Colors.BLUE} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    marginVertical: 10,
    borderBottomWidth: 0.3,
    borderColor: Colors.GRAY,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  infoContainer: {
    padding: 10,
    flex: 3,
  },
  imageContainer: {
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  phone: {
    color: Colors.GRAY,
    fontSize: 18,
  },
  callContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 2,
    flexDirection: 'row',
  },
});


export default UserCard;

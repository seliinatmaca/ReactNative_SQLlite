// In App.js in a new project

import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserList from '../screens/user/userList';
import {USERADD, USERLIST, USERUPDATE} from '../utils/routes';
import UserAdd from '../screens/user/userAdd';
import UserUpdate from '../screens/user/userUpdate';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={USERLIST} component={UserList} />
      <Stack.Screen name={USERADD} component={UserAdd} />
      <Stack.Screen name={USERUPDATE} component={UserUpdate} />
    </Stack.Navigator>
  );
}

export default RootNavigator;

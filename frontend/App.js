import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import UpdateScreen from './screens/UpdateScreen';
import DetailUser from './screens/DetailUser';
import NewUser from './screens/NewUser';

const App = () => {
const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UsersUpdate" component={UpdateScreen} />
        <Stack.Screen name="DetailUser" component={DetailUser} />
        <Stack.Screen name="NewUser" component={NewUser} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

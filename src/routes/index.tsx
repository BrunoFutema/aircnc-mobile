import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import Spots from '../pages/Spots';
import Book from '../pages/Book';

const Routes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <Routes.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fbfbfb' },
    }}
  >
    <Routes.Screen name="Login" component={Login} />
    <Routes.Screen name="Spots" component={Spots} />
    <Routes.Screen name="Book" component={Book} />
  </Routes.Navigator>
);

export default AppRoutes;

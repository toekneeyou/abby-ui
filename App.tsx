import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {useColorScheme} from 'react-native';
import NetWorthScreen from './src/screens/NetWorthScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomNavBar from './src/features/BottomNavBar';
import SettingsScreen from './src/screens/SettingsScreen';
import Header from './src/features/Header';

export type RootStackParamList = {
  'Net Worth': undefined;
  Transactions: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <Header />
      <Tab.Navigator
        tabBar={props => <BottomNavBar {...props} />}
        initialRouteName="Net Worth"
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name="Net Worth" component={NetWorthScreen} />
        <Tab.Screen name="Transactions" component={TransactionsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

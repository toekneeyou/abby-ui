import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';

import {store} from './src/store/store';
import {RootStackParamList, initialState} from './src/store/generalStore';
import LoginScreen from './src/screens/LoginScreen';
import NetWorthScreen from './src/screens/NetWorthScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import BottomNavBar from './src/features/BottomNavBar';
import Header from './src/features/Header';
import StyledSafeAreaView from './src/features/StyledSafeAreaView';

const Tab = createBottomTabNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <StyledSafeAreaView>
        <NavigationContainer>
          <Header />
          <Tab.Navigator
            sceneContainerStyle={styles.screen}
            tabBar={props => <BottomNavBar {...props} />}
            initialRouteName={initialState.currentRoute}
            screenOptions={{
              headerShown: false,
            }}>
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Net Worth" component={NetWorthScreen} />
            <Tab.Screen name="Transactions" component={TransactionsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </StyledSafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
});

export default App;

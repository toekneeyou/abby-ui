import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {useEffect} from 'react';

import Header from './Header';
import BottomNavBar from './BottomNavBar';
import {
  RootStackParamList,
  getIsAuthenticated,
  initialState,
} from '@store/generalStore';
import LoginScreen from '@screens/LoginScreen';
import NetWorthScreen from '@screens/NetWorthScreen';
import TransactionsScreen from '@screens/TransactionsScreen';
import {useAppSelector} from '@store/store';
import useSyncAccounts from '@hooks/useSyncAccounts';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function AuthNavContainer() {
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const syncEverything = useSyncAccounts();

  useEffect(() => {
    if (isAuthenticated) {
      syncEverything();
    }
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      <Header />
      <Tab.Navigator
        sceneContainerStyle={styles.authNavContainer}
        tabBar={props => <BottomNavBar {...props} />}
        initialRouteName={initialState.currentRoute}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name="Login" component={LoginScreen} />
        {isAuthenticated && (
          <>
            <Tab.Screen name="Net Worth" component={NetWorthScreen} />
            <Tab.Screen name="Transactions" component={TransactionsScreen} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  authNavContainer: {
    flex: 1,
  },
});

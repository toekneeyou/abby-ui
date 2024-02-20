import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useColorScheme} from 'react-native';
import NetWorthView from './src/views/NetWorthView';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Net Worth">
        <Stack.Screen name="Net Worth" component={NetWorthView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

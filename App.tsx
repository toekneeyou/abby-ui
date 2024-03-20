import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';

import {store} from './src/store/store';
import {RootStackParamList} from './src/store/generalStore';
import StyledSafeAreaView from './src/features/StyledSafeAreaView';
import AuthNavContainer from '@features/AuthFlow';

const Tab = createBottomTabNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <StyledSafeAreaView>
        <AuthNavContainer />
      </StyledSafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;

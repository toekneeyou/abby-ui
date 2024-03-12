import {useEffect, useState} from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {StyleSheet, View} from 'react-native';

import {
  RootStackParamList,
  getIsAppLoading,
  getIsAuthenticated,
  setIsAppLoading,
} from '../store/generalStore';
import {colors} from '../styles/styleVariables';
import Logo from '../components/Logo';
import {useAppDispatch, useAppSelector} from '../store/store';
import Input from '../components/Input';

type LoginScreenProps = BottomTabScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({navigation, route}: LoginScreenProps) {
  const isAppLoading = useAppSelector(getIsAppLoading);
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // setTimeout(() => {
    //   dispatch(setIsAppLoading(false));
    //   navigation.navigate('Net Worth');
    // }, 1000);
  }, []);

  return (
    <View style={styles.loginScreen}>
      <View style={styles.logo}>
        <Logo color={colors.white} width={125} height={40}/>
      </View>

      <View style={styles.loginForm}>
        <View style={styles.inputs}>
          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={{width: 250}}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={{width: 250}}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginScreen: {
    width: '100%',
    backgroundColor: colors.eggplant[30],
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 50,
    marginBottom: 15,
  },
  loginForm: {},
  inputs: {
    rowGap: 10,
  },
});

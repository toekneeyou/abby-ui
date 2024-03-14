import {useEffect, useState} from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {LayoutAnimation, StyleSheet, Text, View} from 'react-native';
import {API_URL} from '@env';

import {
  RootStackParamList,
  getIsAppLoading,
  setIsAppLoading,
  setIsAuthenticated,
} from '../store/generalStore';
import {colors} from '../styles/styleVariables';
import Logo from '../components/Logo';
import {useAppDispatch, useAppSelector} from '../store/store';
import Input from '../components/Input';
import Button from '../components/Button';
import axios, {AxiosError} from 'axios';
import {login} from '../services/apiService';

type LoginScreenProps = BottomTabScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({navigation, route}: LoginScreenProps) {
  const isAppLoading = useAppSelector(getIsAppLoading);
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(200, 'linear', 'opacity'),
      );
      dispatch(setIsAppLoading(false));
    }, 2000);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await login({username, password});

      const {status} = response;

      if (status === 200) {
        dispatch(setIsAuthenticated(true));
        navigation.navigate('Net Worth');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const {status, code, request, response} = error.toJSON() as AxiosError<
          unknown,
          unknown
        >;
        console.log(status, code, request, response);
      }
    }
  };

  return (
    <View style={styles.loginScreen}>
      <View
        style={[
          styles.top,
          {justifyContent: isAppLoading ? 'center' : 'flex-end'},
        ]}>
        <Logo color={colors.white} width={125} height={40} />
      </View>

      {!isAppLoading && (
        <View style={styles.middle}>
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
              isSecure={true}
            />
          </View>
          <View style={styles.buttons}>
            <Button
              onPress={handleLogin}
              label="Login"
              disabled={!username || !password}
              style={{width: 250}}
            />
            <Button
              type="text"
              label="Forgot username/password?"
              color="gray"
              size="compact"
            />
          </View>
        </View>
      )}

      {!isAppLoading && (
        <View style={styles.bottom}>
          <Button type="text" label="Register" color="gray" size="compact" />
        </View>
      )}
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
  top: {
    flex: 1,
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
    padding: 25,
  },
  inputs: {
    rowGap: 10,
    marginBottom: 15,
  },
  buttons: {
    rowGap: 10,
  },
  bottom: {flex: 1, justifyContent: 'flex-end', paddingBottom: 25},
});

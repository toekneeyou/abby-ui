import {useEffect, useState} from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {LayoutAnimation, StyleSheet, Text, View} from 'react-native';
import axios, {AxiosError} from 'axios';

import {
  RootStackParamList,
  getIsAppLoading,
  setIsAppLoading,
  setIsAuthenticated,
} from '@store/generalStore';
import {colors} from '@styles/styleVariables';
import Logo from '@components/Logo';
import {useAppDispatch, useAppSelector} from '@store/store';
import Input from '@components/Input';
import Button from '@components/Button';
import {login} from '@services/apiService';
import {typography} from '@styles/globalStyles';
import {setUser} from '@store/userStore';

type LoginScreenProps = BottomTabScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({navigation, route}: LoginScreenProps) {
  const isAppLoading = useAppSelector(getIsAppLoading);
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<AxiosError<any, any> | Error>();

  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(200, 'linear', 'opacity'),
      );
      dispatch(setIsAppLoading(false));
    }, 2000);
  }, []);

  const handleLogin = async () => {
    if (!username && !password) {
      setError(new Error('Both fields are empty, you dumbass!'));
      return;
    }
    if (!username) {
      setError(new Error('You forgot your username, idiot!'));
      return;
    }

    if (!password) {
      setError(new Error('WTF is your password?'));
      return;
    }

    try {
      const response = await login({username, password});
      const {status, data} = response;

      if (status === 200) {
        setUser(data);

        dispatch(setIsAuthenticated(true));
        navigation.navigate('Net Worth');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const {status} = error.toJSON() as AxiosError<unknown, unknown>;
        switch (status) {
          case 401:
            error.message = 'You fucked up!';
            break;
          default:
            error.message = `Okay, this one's on us. Try again.`;
        }

        setError(error);
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
              selectTextOnFocus={false}
              textContentType="username"
            />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={{width: 250}}
              isSecure={true}
              selectTextOnFocus={false}
              textContentType="password"
            />
          </View>
          <View style={styles.buttons}>
            {!!error && (
              <Text
                style={[
                  typography.b2,
                  {
                    textAlign: 'center',
                    alignSelf: 'center',
                    color: colors.tomato[10],
                    width: 250,
                  },
                ]}>
                {error.message}
              </Text>
            )}

            <Button
              color={'pistachio'}
              onPress={handleLogin}
              label="Login"
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

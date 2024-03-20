import {useEffect, useState} from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {LayoutAnimation, Modal, StyleSheet, Text, View} from 'react-native';
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
import {LoginRequest, login} from '@services/authenticationService';
import {typography} from '@styles/globalStyles';
import {setLinkToken, setUser} from '@store/userStore';
import {createLinkToken} from '@services/plaidService';

type LoginScreenProps = BottomTabScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({navigation, route}: LoginScreenProps) {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<AxiosError<any, any> | Error>();

  const isAppLoading = useAppSelector(getIsAppLoading);

  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(200, 'linear', 'opacity'),
      );
      dispatch(setIsAppLoading(false));
    }, 2000);
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    if (!username && !password) {
      setError(new AxiosError('Both fields are empty, you dumbass!'));
      return;
    }
    if (!username) {
      setError(new AxiosError('You forgot your username, idiot!'));
      return;
    }

    if (!password) {
      setError(new AxiosError('WTF is your password?'));
      return;
    }

    try {
      const loginRequest: LoginRequest = {username, password};
      const user = await login(loginRequest);

      if (user) {
        // save user into store
        dispatch(setUser(user));
        // create linkToken
        const linkToken = await createLinkToken(user.id);
        if (linkToken) {
          dispatch(setLinkToken(linkToken));
        }
        // authenticate user and navigate to Net Worth
        dispatch(setIsAuthenticated(true));
        navigation.navigate('Net Worth');
      } else {
        setError(new AxiosError('Not sure what happened here. Try again.'));
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
    } finally {
      setIsLoggingIn(false);
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
              isLoading={isLoggingIn}
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

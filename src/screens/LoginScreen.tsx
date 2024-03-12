import {useEffect, useState} from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {LayoutAnimation, StyleSheet, Text, View} from 'react-native';

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
import {faSackDollar} from '@fortawesome/free-solid-svg-icons';

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

  const handleLogin = () => {
    dispatch(setIsAuthenticated(true));
    navigation.navigate('Net Worth');
  };

  return (
    <View style={styles.loginScreen}>
      <View style={styles.logo}>
        <Logo color={colors.white} width={125} height={40} />
      </View>

      {!isAppLoading && (
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
              isSecure={true}
            />
          </View>
          <View style={styles.buttons}>
            <Button onPress={handleLogin} label="Login" />
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
        <View style={{position: 'absolute', bottom: 25}}>
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
  logo: {
    height: 50,
    marginBottom: 10,
  },
  loginForm: {},
  inputs: {
    rowGap: 10,
    marginBottom: 15,
  },
  buttons: {
    rowGap: 10,
  },
});

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootStackParamList, setIsAppLoading} from '../store/generalStore';
import {StyleSheet, View} from 'react-native';
import {componentNames} from '../store/layoutStore';
import {colors} from '../styles/styleVariables';
import Logo from '../components/Logo';
import {useEffect} from 'react';
import {useAppDispatch} from '../store/store';

type LoadingScreenProps = BottomTabScreenProps<RootStackParamList, 'Loading'>;

export default function LoadingScreen({navigation, route}: LoadingScreenProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setIsAppLoading(false));
      navigation.navigate('Net Worth');
    }, 1000);
  }, []);

  return (
    <View style={styles.loadingScreen}>
      <Logo color={colors.white} width={'30%'} />
    </View>
  );
}

LoadingScreen.name = componentNames.loadingScreen;

const styles = StyleSheet.create({
  loadingScreen: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.eggplant[30],
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

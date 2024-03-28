import {useEffect, useState} from 'react';
import {getCurrentRoute} from '../store/generalStore';
import {useAppSelector} from '../store/store';
import {colors} from '../styles/styleVariables';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

type StyledSafeAreaViewProps = {
  children: React.JSX.Element | React.JSX.Element[];
};

export default function StyledSafeAreaView({
  children,
}: StyledSafeAreaViewProps) {
  const route = useAppSelector(getCurrentRoute);

  const [backgroundColor, setBackgroundColor] = useState(colors.eggplant[30]);

  useEffect(() => {
    switch (route) {
      case 'Login':
        setBackgroundColor(colors.eggplant[30]);
        break;
      case 'Home':
      case 'Transactions':
      case 'Settings':
        setBackgroundColor(colors.white);
        break;
      default:
        setBackgroundColor(colors.white);
    }
  }, [route]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor}}>{children}</SafeAreaView>
    </SafeAreaProvider>
  );
}

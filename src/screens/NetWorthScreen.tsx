import React, {useEffect, useRef} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import InfoDisplay from '../features/InfoDisplay';
import {colors, spacing} from '../styles/styleVariables';
import AccountCard from '../features/AccountCard';
import {accountData} from '../mockData/accountData';
import {useAppDispatch} from '../store/store';
import {heights, setIsSubHeaderShown} from '../store/layoutStore';
import {RootStackParamList, setCurrentRoute} from '../store/generalStore';

type NetWorthScreenProps = BottomTabScreenProps<
  RootStackParamList,
  'Net Worth'
>;

export default function NetWorthScreen({route}: NetWorthScreenProps) {
  const dispatch = useAppDispatch();

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = e.nativeEvent.contentOffset.y;
    // @ts-ignore
    if (scrollY > heights.infoDisplay - heights.subHeader) {
      dispatch(setIsSubHeaderShown(true));
    } else {
      dispatch(setIsSubHeaderShown(false));
    }
  };

  useEffect(() => {
    dispatch(setCurrentRoute(route.name));
  }, []);

  return (
    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={styles.netWorthScreen}>
      <InfoDisplay />
      <View style={[styles.accountCards]}>
        {accountData.map(account => {
          return <AccountCard key={account.category} item={account} />;
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  netWorthScreen: {
    backgroundColor: colors.eggplant[30],
    flexGrow: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  accountCards: {
    flex: 1,
    backgroundColor: colors.eggplant[30],
    paddingTop: spacing.ends,
    paddingBottom: spacing.ends + 90,
    paddingLeft: spacing.sides,
    paddingRight: spacing.sides,
    rowGap: 15,
  },
});

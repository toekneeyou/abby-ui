import React, {useEffect} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {AxiosError} from 'axios';

import {colors, spacing} from '@styles/styleVariables';
import AccountCard from '@features/AccountCard';
import {useAppDispatch, useAppSelector} from '@store/store';
import {heights, setIsSubHeaderShown} from '@store/layoutStore';
import {
  RootStackParamList,
  getIsPanningChart,
  getIsSyncing,
  setCurrentRoute,
  setError,
  setIsSyncing,
} from '@store/generalStore';
import {AccountType, getAccounts} from '@store/financialDataStore';
import {isDev} from '@services/helper';
import useSyncAccounts from '@hooks/useSyncAccounts';

import NetWorthChart from '@features/netWorthChart/NetWorthChart';

type NetWorthScreenProps = BottomTabScreenProps<
  RootStackParamList,
  'Net Worth'
>;

export default function NetWorthScreen({route}: NetWorthScreenProps) {
  const dispatch = useAppDispatch();

  const isSyncing = useAppSelector(getIsSyncing);
  const accounts = useAppSelector(getAccounts);
  const isPanningChart = useAppSelector(getIsPanningChart);
  const syncEverything = useSyncAccounts();

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

  const handleRefresh = async () => {
    dispatch(setIsSyncing(true));
    if (isDev()) {
      console.log('handleRefresh');
    }
    try {
      syncEverything();
    } catch (error) {
      dispatch(setError(error as AxiosError));
    } finally {
      dispatch(setIsSyncing(false));
    }
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={styles.netWorthScreen}
      scrollEnabled={!isPanningChart}
      refreshControl={
        <RefreshControl
          refreshing={isSyncing}
          onRefresh={handleRefresh}
          style={{backgroundColor: colors.white}}
        />
      }>
      <NetWorthChart />
      <View style={[styles.accountCards]}>
        {Object.entries(accounts).map(([type, a]) => {
          return (
            <AccountCard key={type} type={type as AccountType} accounts={a} />
          );
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

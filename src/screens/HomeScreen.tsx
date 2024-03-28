import React, {useEffect} from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {AxiosError} from 'axios';

import {colors} from '@styles/styleVariables';
import AccountCard from '@features/AccountCard';
import {useAppDispatch, useAppSelector} from '@store/store';
import {
  getLayouts,
  heights,
  paddings,
  setIsSubHeaderShown,
} from '@store/layoutStore';
import {
  RootStackParamList,
  setCurrentRoute,
  setError,
} from '@store/generalStore';
import {AccountType, getAccounts} from '@store/financialDataStore';
import {isDev} from '@services/helper';
import useSyncAccounts from '@hooks/useSyncAccounts';
import TrendChart from '@features/trendChart/TrendChart';
import {getIsPanningTrendsChart} from '@store/trendsStore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AddAccountQuote from '@features/AddAccountQuote';
import TrendItemDetail from '@features/TrendItemDetail';
import TrendCategoryFilter from '@features/TrendCategoryFilter';

type HomeScreenProps = BottomTabScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({route}: HomeScreenProps) {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const accounts = useAppSelector(getAccounts);
  const isPanningTrendsChart = useAppSelector(getIsPanningTrendsChart);
  const syncEverything = useSyncAccounts();
  const layouts = useAppSelector(getLayouts);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = e.nativeEvent.contentOffset.y;
    // @ts-ignore
    if (
      scrollY >
      heights.trendCategoryFilter + heights.trendDetail - heights.subHeader
    ) {
      dispatch(setIsSubHeaderShown(true));
    } else {
      dispatch(setIsSubHeaderShown(false));
    }
  };

  useEffect(() => {
    dispatch(setCurrentRoute(route.name));
  }, []);

  const handleRefresh = async () => {
    if (isDev()) {
      console.log('handleRefresh');
    }
    try {
      syncEverything();
    } catch (error) {
      dispatch(setError(error as AxiosError));
    }
  };

  const hasAccounts = Object.entries(accounts).length > 0;

  return (
    <>
      {hasAccounts ? (
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.homeScreen}
          scrollEnabled={!isPanningTrendsChart}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={handleRefresh}
              style={{backgroundColor: colors.white}}
            />
          }>
          <TrendCategoryFilter />
          <TrendItemDetail />
          <TrendChart />

          <View
            style={[
              styles.accountCards,
              {
                minHeight:
                  Dimensions.get('screen').height -
                  heights.header -
                  heights.trendDetail -
                  heights.trendCategoryFilter -
                  heights.chart -
                  heights.chartFilters -
                  (layouts.BottomNavBar?.height ?? 0) -
                  insets.top,
                paddingBottom:
                  (layouts.BottomNavBar?.height ?? 0) + paddings.accountCards.v,
              },
            ]}>
            {Object.entries(accounts).map(([type, a]) => {
              return (
                <AccountCard
                  key={type}
                  type={type as AccountType}
                  accounts={a}
                />
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <AddAccountQuote
          quote={`"I just want to lie on the beach and eat hot dogs. That's all I've ever wanted." - Kevin Malone`}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    position: 'relative',
  },
  accountCards: {
    flex: 1,
    backgroundColor: colors.eggplant[30],
    paddingTop: paddings.accountCards.v,
    paddingHorizontal: paddings.accountCards.h,
    rowGap: 15,
  },
});

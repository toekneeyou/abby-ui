import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Chart from '@components/Chart';
import Chip from '@components/Chip';
import {colors} from '@styles/styleVariables';
import {NetWorth, getNetWorths} from '@store/financialDataStore';
import {netWorthSort} from '@services/helper';
import {useAppSelector} from '@store/store';

type ChartFilterOption = '1w' | '1m' | '1y' | 'YTD' | 'Max';
const filters: ChartFilterOption[] = ['1w', '1m', '1y', 'YTD', 'Max'];

export default function NetWorthChart() {
  const netWorths = useAppSelector(getNetWorths);
  const [selectedFilter, setSelectedFilter] = useState<ChartFilterOption>('1w');
  const [filteredData, setFilteredData] = useState<NetWorth[]>(netWorths);

  useEffect(() => {
    const todaysDate = new Date(new Date().setHours(0, 0, 0, 0));
    const thisMonth = todaysDate.getMonth();
    const thisYear = todaysDate.getFullYear();
    const thisDay = todaysDate.getDate();

    let newFilteredData: NetWorth[] = [];
    switch (selectedFilter) {
      case '1w':
        const oneWeekAgo = new Date(
          todaysDate.getTime() - 7 * 24 * 60 * 60 * 1000,
        );
        newFilteredData = netWorths.filter(nw => {
          const date = new Date(nw.year, nw.month, nw.day);
          return date > oneWeekAgo;
        });
        break;
      case '1m':
        const oneMonthAgo = new Date(
          thisMonth === 0 ? thisYear - 1 : thisYear,
          thisMonth === 0 ? 11 : thisMonth - 1,
          thisDay,
        );
        newFilteredData = netWorths.filter(nw => {
          const date = new Date(nw.year, nw.month, nw.day);
          return date > oneMonthAgo;
        });
        break;
      case '1y':
        const oneYearAgoToday = new Date(thisYear - 1, thisMonth, thisDay);
        newFilteredData = netWorths.filter(nw => {
          const date = new Date(nw.year, nw.month, nw.day);
          return date > oneYearAgoToday;
        });
        break;
      case 'YTD':
        newFilteredData = netWorths.filter(nw => nw.year === thisYear);
        break;
      case 'Max':
      default:
        newFilteredData = [...netWorths];
        newFilteredData.sort(netWorthSort);
    }
    setFilteredData(newFilteredData);
  }, [selectedFilter]);

  return (
    <View style={styles.netWorthChart}>
      <Chart data={filteredData} />

      <View style={styles.chartFilter}>
        {filters.map(filter => {
          return (
            <Chip
              key={filter}
              label={filter}
              type={selectedFilter === filter ? 'filled' : 'text'}
              onPress={() => setSelectedFilter(filter)}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  netWorthChart: {},
  chartFilter: {
    height: 30,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

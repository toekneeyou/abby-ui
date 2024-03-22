import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {getNetWorths} from '@store/financialDataStore';
import {useAppDispatch, useAppSelector} from '@store/store';
import {colors} from '@styles/styleVariables';
import {useNetWorthFilters} from '@hooks/useNetWorthFilters';
import ChartFilters from './NetWorthChartFilters';
import Chart from '@components/Chart';

export default function NetWorthChart() {
  const dispatch = useAppDispatch();
  const netWorths = useAppSelector(getNetWorths);

  const {filteredData, filter, setFilter} = useNetWorthFilters(netWorths);

  return (
    <View style={[styles.netWorthChart]}>
      <Chart data={filteredData} height={130} />
      <ChartFilters filter={filter} setFilter={setFilter} />
    </View>
  );
}

const styles = StyleSheet.create({
  netWorthChart: {},
});

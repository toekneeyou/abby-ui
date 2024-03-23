import React, {useEffect, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import * as d3 from 'd3';

import {
  getNetWorths,
  getSelectedNetWorth,
  setSelectedNetWorth,
} from '@store/financialDataStore';
import {useAppDispatch, useAppSelector} from '@store/store';
import {useNetWorthFilters} from '@features/netWorthChart/useNetWorthFilters';
import ChartFilters from './NetWorthChartFilters';
import {getIsPanningChart, setIsPanningChart} from '@store/generalStore';
import Chart, {
  ChartClosestPoint,
  ChartDataPoint,
} from '@components/chart/Chart';
import InfoDisplay from '@features/InfoDisplay';

export default function NetWorthChart() {
  const dispatch = useAppDispatch();
  const netWorths = useAppSelector(getNetWorths);
  const {filteredData, filter, setFilter} = useNetWorthFilters(netWorths);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const selectedNetWorth = useAppSelector(getSelectedNetWorth);
  const isPanningChart = useAppSelector(getIsPanningChart);

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const height = 130;

    setChartData(() => {
      const xScaler = d3.scaleLinear(
        [0, filteredData.length - 1],
        [0, screenWidth],
      );
      const newXCoords = new Array(filteredData.length).fill(0).map((_, i) => {
        return Math.round(xScaler(i));
      });
      const [yMin, yMax] = d3.extent(filteredData, d => +d.amount);
      const yScaler = d3.scaleLinear([yMin ?? 0, yMax ?? 0], [height, 0]);
      const newYCoords = filteredData.map(d => {
        return Math.round(yScaler(d.amount));
      });
      const newChartData = newYCoords.map((d, i) => {
        return {x: newXCoords[i], y: newYCoords[i]};
      });
      return newChartData;
    });
  }, [filteredData]);

  const onPanStart = () => {
    dispatch(setIsPanningChart(true));
  };

  const onPanMove: (closest: ChartClosestPoint) => void = ({index, point}) => {
    if (typeof index === 'number') {
      dispatch(setSelectedNetWorth(filteredData[index]));
    }
  };

  const onPanEnd = () => {
    dispatch(setIsPanningChart(false));
    dispatch(setSelectedNetWorth(filteredData[filteredData.length - 1]));
  };

  const netWorthChange = useMemo(() => {
    const firstItem = filteredData[0];
    const lastItem = filteredData[filteredData.length - 1];
    if (firstItem && lastItem && selectedNetWorth) {
      return (
        ((isPanningChart ? selectedNetWorth.amount : lastItem.amount) -
          firstItem.amount) /
        Math.abs(firstItem.amount)
      );
    }
  }, [filteredData, selectedNetWorth, isPanningChart]);

  return (
    <View style={[styles.netWorthChart]}>
      <InfoDisplay netWorthChange={netWorthChange} />
      <Chart
        data={chartData}
        width={Dimensions.get('window').width}
        height={130}
        onPanStart={onPanStart}
        onPanEnd={onPanEnd}
        onPanMove={onPanMove}
      />
      <ChartFilters filter={filter} setFilter={setFilter} />
    </View>
  );
}

const styles = StyleSheet.create({
  netWorthChart: {},
});

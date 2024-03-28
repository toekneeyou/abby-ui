import React, {useEffect, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import * as d3 from 'd3';

import {} from '@store/financialDataStore';
import {useAppDispatch, useAppSelector} from '@store/store';
import useTrendFilters from '@features/trendChart/useTrendFilters';
import TrendChartFilters from './TrendChartFilters';
import {
  getIsPanningTrendsChart,
  getSelectedTrendItem,
  setIsPanningTrendsChart,
  setSelectedTrendItem,
} from '@store/trendsStore';
import Chart, {
  ChartClosestPoint,
  ChartDataPoint,
} from '@components/chart/Chart';

import {heights} from '@store/layoutStore';

export default function TrendChart() {
  const dispatch = useAppDispatch();

  const {filteredData, filter, setFilter} = useTrendFilters();
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const isPanningChart = useAppSelector(getIsPanningTrendsChart);
  const selectedTrend = useAppSelector(getSelectedTrendItem);

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const height = 130;

    if (filteredData.length > 0) {
      setChartData(() => {
        const xScaler = d3.scaleLinear(
          [0, filteredData.length - 1],
          [0, screenWidth],
        );
        const newXCoords = new Array(filteredData.length)
          .fill(0)
          .map((_, i) => {
            return Math.round(xScaler(i));
          });

        let yMin = filteredData[0].value;
        let yMax = filteredData[0].value;
        filteredData.forEach(d => {
          yMin = Math.min(yMin, d.value);
          yMax = Math.max(yMax, d.value);
        });

        const yScaler = d3.scaleLinear([yMin ?? 0, yMax ?? 0], [height, 0]);
        const newYCoords = filteredData.map(d => {
          return Math.round(yScaler(d.value));
        });
        const newChartData = newYCoords.map((d, i) => {
          return {x: newXCoords[i], y: newYCoords[i]};
        });

        return newChartData;
      });
    } else {
      setChartData([]);
    }
  }, [filteredData]);

  const onPanStart = () => {
    dispatch(setIsPanningTrendsChart(true));
  };

  const onPanMove: (closest: ChartClosestPoint) => void = ({index, point}) => {
    if (typeof index === 'number') {
      dispatch(setSelectedTrendItem(filteredData[index]));
    }
  };

  const onPanEnd = () => {
    dispatch(setIsPanningTrendsChart(false));
    dispatch(setSelectedTrendItem(filteredData[filteredData.length - 1]));
  };

  const trendValueChange = useMemo(() => {
    const firstItem = filteredData[0];
    const lastItem = filteredData[filteredData.length - 1];
    if (firstItem && lastItem && selectedTrend) {
      return (
        ((isPanningChart ? selectedTrend.value : lastItem.value) -
          firstItem.value) /
        Math.abs(firstItem.value)
      );
    }
  }, [filteredData, selectedTrend, isPanningChart]);

  return (
    <View style={[styles.trendChart]}>
      <View style={{zIndex: 8}}>
        <Chart
          data={chartData}
          width={Dimensions.get('window').width}
          height={heights.chart}
          onPanStart={onPanStart}
          onPanEnd={onPanEnd}
          onPanMove={onPanMove}
        />
      </View>
      <TrendChartFilters filter={filter} setFilter={setFilter} />
    </View>
  );
}

const styles = StyleSheet.create({
  trendChart: {},
});

import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View} from 'react-native';

import Chip from '@components/Chip';
import {
  TrendChartFilterOption,
  trendChartFilters,
} from '@features/trendChart/useTrendFilters';
import {colors} from '@styles/styleVariables';
import {heights, paddings} from '@store/layoutStore';

type TrendChartFiltersProps = {
  filter: TrendChartFilterOption;
  setFilter: Dispatch<SetStateAction<TrendChartFilterOption>>;
};
export default function TrendChartFilters({
  filter,
  setFilter,
}: TrendChartFiltersProps) {
  return (
    <View style={[styles.chartFilters]}>
      {trendChartFilters.map(f => {
        return (
          <Chip
            key={f}
            label={f}
            onPress={() => setFilter(f)}
            type={filter === f ? 'filled' : 'text'}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  chartFilters: {
    alignItems: 'center',
    height: heights.chartFilters,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: paddings.chartFilters.h,
  },
});

import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View} from 'react-native';

import Chip from '@components/Chip';
import {
  NetWorthFilterOption,
  netWorthChartFilters,
} from '@features/netWorthChart/useNetWorthFilters';
import {colors} from '@styles/styleVariables';

type ChartFilterProps = {
  filter: NetWorthFilterOption;
  setFilter: Dispatch<SetStateAction<NetWorthFilterOption>>;
};
export default function ChartFilters({filter, setFilter}: ChartFilterProps) {
  return (
    <View style={[styles.chartFilters]}>
      {netWorthChartFilters.map(f => {
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: colors.white,
    paddingVertical: 10,
  },
});

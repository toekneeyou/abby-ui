import Chip from '@components/Chip';
import {colors} from '@styles/styleVariables';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

export default function ChartFilter() {
  const [isSelected, setIsSelected] = useState('1w');

  return (
    <View style={styles.chartFilter}>
      <Chip
        label="1w"
        type={isSelected === '1w' ? 'filled' : 'text'}
        onPress={() => setIsSelected('1w')}
      />
      <Chip
        label="1m"
        type={isSelected === '1m' ? 'filled' : 'text'}
        onPress={() => setIsSelected('1m')}
      />
      <Chip
        label="1y"
        type={isSelected === '1y' ? 'filled' : 'text'}
        onPress={() => setIsSelected('1y')}
      />
      <Chip
        label="YTD"
        type={isSelected === 'YTD' ? 'filled' : 'text'}
        onPress={() => setIsSelected('YTD')}
      />
      <Chip
        label="Max"
        type={isSelected === 'Max' ? 'filled' : 'text'}
        onPress={() => setIsSelected('Max')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartFilter: {
    height: 30,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

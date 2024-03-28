import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {typography} from '../styles/globalStyles';
import {useAppSelector} from '@store/store';
import {returnCurrency} from '@services/helper';
import {getSelectedTrendItem} from '@store/trendsStore';

export default function HomeScreenSubHeader() {
  const selectedTrend = useAppSelector(getSelectedTrendItem);

  return (
    <View style={styles.homeScreenSubHeader}>
      <View style={styles.left}>
        <Text style={[{textTransform: 'capitalize'}, typography.h3]}>
          {selectedTrend?.category}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={typography.h3}>
          {selectedTrend
            ? returnCurrency(selectedTrend.value as number)
            : '$0.00'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreenSubHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 5,
  },
  left: {},
  right: {},
});

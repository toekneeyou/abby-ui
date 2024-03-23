import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {typography} from '../styles/globalStyles';
import {useAppSelector} from '@store/store';
import {getSelectedNetWorth} from '@store/financialDataStore';
import {returnCurrency} from '@services/helper';

export default function NetWorthSubHeader() {
  const selectedNetWorth = useAppSelector(getSelectedNetWorth);

  return (
    <View style={styles.netWorthSubHeader}>
      <View style={styles.netWorthSubHeaderLeft}>
        <Text style={typography.h3}>Net Worth</Text>
      </View>
      <View style={styles.netWorthSubHeaderRight}>
        <Text style={typography.h3}>
          {selectedNetWorth
            ? returnCurrency(selectedNetWorth.amount as number)
            : '$0.00'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  netWorthSubHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 5,
  },
  netWorthSubHeaderLeft: {},
  netWorthSubHeaderRight: {},
});

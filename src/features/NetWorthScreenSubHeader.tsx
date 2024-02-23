import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {typography} from '../styles/globalStyles';

export default function NetWorthSubHeader() {
  return (
    <View style={styles.netWorthSubHeader}>
      <View style={styles.netWorthSubHeaderLeft}>
        <Text style={typography.h3}>Net Worth</Text>
      </View>
      <View style={styles.netWorthSubHeaderRight}>
        <Text style={typography.h3}>$1,234.23</Text>
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

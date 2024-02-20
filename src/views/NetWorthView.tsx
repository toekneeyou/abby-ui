import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons';

import {typography} from '../styles/globalStyles';

export default function NetWorthView() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={typography.h1}>Net Worth</Text>
      <FontAwesomeIcon icon={faHouse} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

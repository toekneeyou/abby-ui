import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {typography} from '../styles/globalStyles';

export default function NetWorthView() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={typography.h1}>Net Worth</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

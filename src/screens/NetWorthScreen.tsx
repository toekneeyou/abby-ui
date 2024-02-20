import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import {typography} from '../styles/globalStyles';
import {RootStackParamList} from '../../App';

type NetWorthScreenProps = BottomTabScreenProps<
  RootStackParamList,
  'Net Worth'
>;

export default function NetWorthScreen({navigation}: NetWorthScreenProps) {
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

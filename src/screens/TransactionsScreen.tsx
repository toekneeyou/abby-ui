import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import {typography} from '../styles/globalStyles';
import {RootStackParamList} from '../../App';

type TransactionsScreenProps = BottomTabScreenProps<
  RootStackParamList,
  'Transactions'
>;

export default function TransactionsScreen({
  navigation,
}: TransactionsScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={typography.h1}>Transactions</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

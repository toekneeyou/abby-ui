import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import {typography} from '../styles/globalStyles';
import {RootStackParamList} from '../../App';
import InfoDisplay from '../features/InfoDisplay';
import {colors} from '../styles/styleVariables';

type NetWorthScreenProps = BottomTabScreenProps<
  RootStackParamList,
  'Net Worth'
>;

export default function NetWorthScreen({navigation}: NetWorthScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <InfoDisplay />
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
        <Text style={typography.h1}>Net Worth</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

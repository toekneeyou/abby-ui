import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import {typography} from '../styles/globalStyles';
import {RootStackParamList} from '../../App';

type SettingsScreenProps = BottomTabScreenProps<RootStackParamList, 'Settings'>;

export default function SettingsScreen({navigation}: SettingsScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={typography.h1}>Settings</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

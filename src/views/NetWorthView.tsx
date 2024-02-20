import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {faHouse} from '@fortawesome/free-solid-svg-icons';

import {typography} from '../styles/globalStyles';
import IconButton from '../components/IconButton';

export default function NetWorthView() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={typography.h1}>Net Worth</Text>
      <IconButton
        icon={faHouse}
        type="text"
        onPressHandler={() => console.log('click')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

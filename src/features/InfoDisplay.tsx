import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {colors} from '../styles/styleVariables';
import {typography} from '../styles/globalStyles';

export default function InfoDisplay() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={typography.h3}>Net Worth</Text>
      </View>
      <View style={styles.value}>
        <Text style={typography.h1}>$1,935</Text>
        <Text
          style={[
            typography.b1,
            {fontWeight: 'bold', alignSelf: 'flex-start'},
          ]}>
          .23
        </Text>
      </View>
      <View style={styles.info}>
        <Text
          style={[typography.b3, {color: colors.gray[50], fontWeight: 'bold'}]}>
          Feb 20, 2024
        </Text>
        <Text
          style={[
            typography.b3,
            {color: colors.pistachio[10], fontWeight: 'bold', lineHeight: 12},
          ]}>
          1.4%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  value: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 1,
    marginBottom: 5,
  },
  info: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 10,
  },
});

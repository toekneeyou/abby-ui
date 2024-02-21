import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../styles/styleVariables';

import HeaderText from '../components/HeaderText';
import BodyText from '../components/BodyText';

export default function InfoDisplay() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <HeaderText type="h3">Net Worth</HeaderText>
      </View>
      <View style={styles.value}>
        <HeaderText>$2,459</HeaderText>
        <BodyText style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>
          .23
        </BodyText>
      </View>
      <View style={styles.info}>
        <BodyText
          type="b3"
          style={{color: colors.gray[50], fontWeight: 'bold'}}>
          Feb 20, 2024
        </BodyText>
        <BodyText
          type="b3"
          style={{
            color: colors.pistachio[10],
            fontWeight: 'bold',
            lineHeight: 12,
          }}>
          1.4%
        </BodyText>
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

import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowUpLong} from '@fortawesome/free-solid-svg-icons';

import {colors} from '../styles/styleVariables';
import HeaderText from '../components/HeaderText';
import BodyText from '../components/BodyText';
import {heights} from '../store/layoutStore';
import {useAppSelector} from '@store/store';
import {getNetWorth} from '@store/financialDataStore';
import {returnCurrency} from '@services/helper';

type InfoDisplayProps = {};

export default function InfoDisplay({}: InfoDisplayProps) {
  const netWorth = useAppSelector(getNetWorth);
  const [netWorthDisplay, setNetWorthDisplay] = useState({
    dollars: '0',
    cents: '00',
  });

  useEffect(() => {
    const dollars = Math.floor(netWorth);
    const dollarsString = returnCurrency(dollars).replace(/\..*/, '');
    const cents = (netWorth - dollars).toString().replace('.', '').slice(0, 2);
    setNetWorthDisplay({dollars: dollarsString, cents});
  }, [netWorth]);

  return (
    <Animated.View style={[styles.infoDisplay, {height: heights.infoDisplay}]}>
      <View style={styles.title}>
        <HeaderText type="h3">Net Worth</HeaderText>
      </View>
      <View style={styles.value}>
        <HeaderText>{netWorthDisplay.dollars}</HeaderText>
        <BodyText style={{fontWeight: 'bold', transform: [{translateY: 5}]}}>
          {netWorthDisplay.cents}
        </BodyText>
      </View>
      <View style={styles.info}>
        <BodyText
          type="b3"
          style={{color: colors.gray[50], fontWeight: 'bold'}}>
          Feb 20, 2024
        </BodyText>
        <View style={styles.percentage}>
          <BodyText
            type="b3"
            style={{
              color: colors.pistachio[30],
              fontWeight: 'bold',
            }}>
            <FontAwesomeIcon
              icon={faArrowUpLong}
              size={10}
              color={colors.pistachio[30]}
            />
            1.4%
          </BodyText>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  infoDisplay: {
    backgroundColor: colors.white,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  value: {
    alignItems: 'flex-start',
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
  percentage: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

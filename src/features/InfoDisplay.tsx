import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowUpLong} from '@fortawesome/free-solid-svg-icons';

import {colors} from '../styles/styleVariables';
import HeaderText from '../components/HeaderText';
import BodyText from '../components/BodyText';
import {heights} from '../store/layoutStore';
import {useAppSelector} from '@store/store';
import {getNetWorths} from '@store/financialDataStore';
import {returnCurrency} from '@services/helper';

type InfoDisplayProps = {};

export default function InfoDisplay({}: InfoDisplayProps) {
  const netWorths = useAppSelector(getNetWorths);
  const [netWorthDisplay, setNetWorthDisplay] = useState({
    dollars: '0',
    cents: '00',
  });
  const [dateDisplay, setDateDisplay] = useState({
    month: '',
    day: '',
    year: '',
  });

  useEffect(() => {
    const todaysDate = new Date();

    const todaysNetWorth = netWorths.find(n => {
      return (
        n.day === todaysDate.getDate() &&
        n.month === todaysDate.getMonth() &&
        n.year === todaysDate.getFullYear()
      );
    });
    if (todaysNetWorth) {
      const dollars = Math.floor(+todaysNetWorth.amount);
      const dollarsString = returnCurrency(dollars).replace(/\..*/, '');
      const cents = (+todaysNetWorth.amount - dollars)
        .toString()
        .replace('.', '')
        .slice(0, 2);
      setNetWorthDisplay({dollars: dollarsString, cents});

      setDateDisplay(() => {
        let month = '';
        let day = String(todaysNetWorth.day);
        let year = String(todaysNetWorth.year);

        switch (todaysNetWorth.month) {
          case 0:
            month = 'Jan';
            break;
          case 1:
            month = 'Feb';
            break;
          case 2:
            month = 'Mar';
            break;
          case 3:
            month = 'Apr';
            break;
          case 4:
            month = 'May';
            break;
          case 5:
            month = 'Jun';
            break;
          case 6:
            month = 'Jul';
            break;
          case 7:
            month = 'Aug';
            break;
          case 8:
            month = 'Sep';
            break;
          case 9:
            month = 'Oct';
            break;
          case 10:
            month = 'Nov';
            break;
          case 11:
            month = 'Dec';
            break;
          default:
            month = '';
        }

        return {month, day, year};
      });
    }
  }, [netWorths]);

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
          {`${dateDisplay.month} ${dateDisplay.day}, ${dateDisplay.year}`}
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

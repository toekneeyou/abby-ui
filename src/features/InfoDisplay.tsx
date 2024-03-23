import React, {useEffect, useMemo, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowDownLong,
  faArrowUpLong,
} from '@fortawesome/free-solid-svg-icons';

import {colors} from '../styles/styleVariables';
import HeaderText from '../components/HeaderText';
import BodyText from '../components/BodyText';
import {heights} from '../store/layoutStore';
import {useAppSelector} from '@store/store';
import {getSelectedNetWorth} from '@store/financialDataStore';
import {returnCurrency} from '@services/helper';

type InfoDisplayProps = {netWorthChange: number | undefined};

export default function InfoDisplay({netWorthChange}: InfoDisplayProps) {
  const selectedNetWorth = useAppSelector(getSelectedNetWorth);
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
    if (selectedNetWorth) {
      const dollars = Math.floor(selectedNetWorth.amount);
      const dollarsString = returnCurrency(dollars).replace(/\..*/, '');
      const cents = (selectedNetWorth.amount - dollars)
        .toFixed(2)
        .toString()
        .replace('.', '')
        .slice(0, 2);
      setNetWorthDisplay({dollars: dollarsString, cents});

      setDateDisplay(() => {
        let month = '';
        let day = String(selectedNetWorth.day);
        let year = String(selectedNetWorth.year);

        switch (selectedNetWorth.month) {
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
  }, [selectedNetWorth]);

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
        {typeof netWorthChange === 'number' && (
          <View style={styles.percentage}>
            <BodyText
              type="b3"
              style={{
                color:
                  netWorthChange >= 0
                    ? colors.pistachio[30]
                    : colors.tomato[30],
                fontWeight: 'bold',
              }}>
              <FontAwesomeIcon
                icon={netWorthChange >= 0 ? faArrowUpLong : faArrowDownLong}
                size={10}
                color={
                  netWorthChange >= 0 ? colors.pistachio[30] : colors.tomato[30]
                }
              />
              {new Intl.NumberFormat('en-US', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(netWorthChange)}
            </BodyText>
          </View>
        )}
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

import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  faArrowTrendUp,
  faCreditCard,
  faSackDollar,
} from '@fortawesome/free-solid-svg-icons';

import {RootStackParamList} from '../../App';
import InfoDisplay from '../features/InfoDisplay';
import {colors, spacing} from '../styles/styleVariables';
import AccountCard from '../features/AccountCard';

type NetWorthScreenProps = BottomTabScreenProps<
  RootStackParamList,
  'Net Worth'
>;

export default function NetWorthScreen({navigation}: NetWorthScreenProps) {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        <InfoDisplay />
        <View style={styles.accountCardsContainer}>
          <AccountCard
            item={{
              category: 'Cash',
              icon: faSackDollar,
              value: '$1,234',
              accounts: [
                {
                  name: 'SoFi',
                  type: 'Checking',
                  value: '$100.23',
                  syncTime: '1 minute ago',
                },
                {
                  name: 'SoFi',
                  type: 'Savings',
                  value: '$1,200.55',
                  syncTime: '1 minute ago',
                },
                {
                  name: 'Chase',
                  type: 'Checking',
                  value: '$1,211.41',
                  syncTime: '2 minutes ago',
                },
                {
                  name: 'Ally',
                  type: 'Checking',
                  value: '$1.89',
                  syncTime: '3 minutes ago',
                },
              ],
            }}
          />
          <AccountCard
            item={{
              category: 'Investments',
              icon: faArrowTrendUp,
              value: '$3,212',
              accounts: [
                {
                  name: 'RobinHood',
                  type: 'Brokerage',
                  value: '$100.23',
                  syncTime: '1 minute ago',
                },
                {
                  name: 'SoFi',
                  type: 'Brokerage',
                  value: '$1,200.55',
                  syncTime: '1 minute ago',
                },
                {
                  name: 'WeBull',
                  type: 'Brokerage',
                  value: '$1,200.55',
                  syncTime: '1 minute ago',
                },
                {
                  name: 'Fidelity',
                  type: 'Brokerage',
                  value: '$1,200.55',
                  syncTime: '1 minute ago',
                },
              ],
            }}
          />
          <AccountCard
            item={{
              category: 'Credit Cards',
              icon: faCreditCard,
              value: '$56,231',
              accounts: [
                {
                  name: 'SoFi',
                  type: 'Credit Card',
                  value: '$100.23',
                  syncTime: '1 minute ago',
                },
                {
                  name: 'Citi',
                  type: 'Credit Card',
                  value: '$1,200.55',
                  syncTime: '1 minute ago',
                },
                {
                  name: 'Chase',
                  type: 'Credit Card',
                  value: '$1,211.41',
                  syncTime: '2 minutes ago',
                },
                {
                  name: 'Wells Fargo',
                  type: 'Credit Card',
                  value: '$1.89',
                  syncTime: '3 minutes ago',
                },
              ],
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.eggplant[30],
  },
  accountCardsContainer: {
    backgroundColor: colors.eggplant[30],
    paddingTop: spacing.ends,
    paddingBottom: spacing.ends,
    paddingLeft: spacing.sides,
    paddingRight: spacing.sides,
    rowGap: 15,
  },
});

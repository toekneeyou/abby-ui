import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {borders, colors} from '../styles/styleVariables';
import Sofi from '../../assets/images/sofi.jpeg';
import {typography} from '../styles/globalStyles';
import Accordion from '../components/Accordion';
import {Account, AccountType} from '@store/financialDataStore';
import {
  faArrowTrendUp,
  faCreditCard,
  faFileSignature,
  faOtter,
  faSackDollar,
} from '@fortawesome/free-solid-svg-icons';
import {returnCurrency} from '@services/helper';

type AccountCardItem = {
  category: string;
  value: string;
  icon: IconProp;
  accounts: AccountCardAccount[];
};

type AccountCardAccount = {
  name: string;
  type: string;
  value: string;
  syncTime: string;
};

type AccountCardHeaderProps = {
  type: AccountType;
  balance: number;
};

function AccountCardHeader({type, balance}: AccountCardHeaderProps) {
  const [icon, setIcon] = useState<IconProp>(faOtter);
  const [title, setTitle] = useState('');

  useEffect(() => {
    switch (type) {
      case 'depository':
        setIcon(faSackDollar);
        setTitle('Cash');
        break;
      case 'credit':
        setIcon(faCreditCard);
        setTitle('Credit Cards');
        break;
      case 'investment':
        setIcon(faArrowTrendUp);
        setTitle('Investments');
        break;
      case 'loan':
        setIcon(faFileSignature);
        setTitle('Loans');
        break;
      case 'other':
      default:
        setIcon(faOtter);
        setTitle('Other');
    }
  }, [type]);

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <FontAwesomeIcon icon={icon} color={colors.gray[10]} />
        <Text
          style={[typography.b1, {fontWeight: 'bold', color: colors.gray[0]}]}>
          {title}
        </Text>
      </View>
      <View style={styles.headerRight}>
        <Text
          style={[typography.b1, {fontWeight: 'bold', color: colors.gray[0]}]}>
          {returnCurrency(balance)}
        </Text>
      </View>
    </View>
  );
}

type AccountCardItemProps = {
  account: Account;
  isLast: boolean;
};

function AccountCardItem({account, isLast}: AccountCardItemProps) {
  return (
    <View style={[styles.item, isLast && styles.itemLast]}>
      <View style={styles.itemLeft}>
        <View>
          <Image
            source={Sofi}
            style={{width: 24, height: 24, borderRadius: 100}}
          />
        </View>
        <View style={styles.itemLeftInfo}>
          <Text style={typography.b1}>{account.plaidName}</Text>
          <Text
            style={[
              typography.b2,
              {color: colors.gray[50], textTransform: 'capitalize'},
            ]}>
            {account.plaidSubType}
          </Text>
        </View>
      </View>
      <View style={styles.itemRight}>
        <Text style={typography.b1}>
          {returnCurrency(account.plaidCurrentBalance)}
        </Text>
        {/* <Text style={[typography.b2, {color: colors.gray[50]}]}>
          {account.lastSync}
        </Text> */}
      </View>
    </View>
  );
}

type AccountCardProps = {
  accounts: Account[];
  type: AccountType;
};

export default function AccountCard({type, accounts}: AccountCardProps) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const newBalance = accounts.reduce((p, c) => {
      return p + (c.plaidCurrentBalance ?? 0);
    }, 0);
    setBalance(newBalance);
  }, [accounts]);

  return (
    <Accordion
      header={<AccountCardHeader type={type} balance={balance} />}
      initialIsCollapsed={false}
      headerBackgroundColor={colors.eggplant[40]}
      caretColor={colors.gray[0]}>
      {accounts.map((account, index) => {
        const isLast = index === accounts.length - 1;
        return (
          <AccountCardItem
            account={account}
            key={`${account.plaidName}${account.plaidCurrentBalance}${index}`}
            isLast={isLast}
          />
        );
      })}
    </Accordion>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  headerRight: {flexDirection: 'row', alignItems: 'center', columnGap: 5},
  item: {
    borderBottomWidth: 1,
    backgroundColor: colors.gray[0],
    borderBottomColor: colors.white,
    height: 65,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLast: {
    borderBottomWidth: 0,
    borderBottomEndRadius: borders.radius,
    borderBottomStartRadius: borders.radius,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: 5,
  },
  itemLeftInfo: {},
  itemRight: {alignItems: 'flex-end'},
});

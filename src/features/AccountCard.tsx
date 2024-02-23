import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {borders, colors} from '../styles/styleVariables';
import Sofi from '../../assets/images/sofi.jpeg';
import {typography} from '../styles/globalStyles';
import Accordion from '../components/Accordion';

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
  item: AccountCardItem;
};

function AccountCardHeader({item}: AccountCardHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <FontAwesomeIcon icon={item.icon} color={colors.eggplant[50]} />
        <Text style={[typography.b1, {fontWeight: 'bold'}]}>
          {item.category}
        </Text>
      </View>
      <View style={styles.headerRight}>
        <Text style={[typography.b1, {fontWeight: 'bold'}]}>{item.value}</Text>
      </View>
    </View>
  );
}

type AccountCardItemProps = {
  account: AccountCardAccount;
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
          <Text style={typography.b1}>{account.name}</Text>
          <Text style={[typography.b2, {color: colors.gray[50]}]}>
            {account.type}
          </Text>
        </View>
      </View>
      <View style={styles.itemRight}>
        <Text style={typography.b1}>{account.value}</Text>
        <Text style={[typography.b2, {color: colors.gray[50]}]}>
          {account.syncTime}
        </Text>
      </View>
    </View>
  );
}

type AccountCardProps = {
  item: AccountCardItem;
};

export default function AccountCard({item}: AccountCardProps) {
  return (
    <Accordion
      header={<AccountCardHeader item={item} />}
      initialIsCollapsed={false}>
      {item.accounts.map((account, index) => {
        const isLast = index === item.accounts.length - 1;
        return (
          <AccountCardItem
            account={account}
            key={`${account.name}${account.value}`}
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

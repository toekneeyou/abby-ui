import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {borders, colors, spacing} from '../styles/styleVariables';
import Sofi from '../../assets/images/sofi.jpeg';
import IconButton from '../components/IconButton';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {typography} from '../styles/globalStyles';

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
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

function AccountCardHeader({
  item,
  isCollapsed,
  setIsCollapsed,
}: AccountCardHeaderProps) {
  return (
    <Pressable
      onPress={() => setIsCollapsed(!isCollapsed)}
      style={styles.header}>
      <View style={styles.headerLeft}>
        <FontAwesomeIcon icon={item.icon} color={colors.eggplant[50]} />
        <Text style={[typography.b1, {fontWeight: 'bold'}]}>
          {item.category}
        </Text>
      </View>
      <View style={styles.headerRight}>
        <Text style={[typography.b1, {fontWeight: 'bold'}]}>{item.value}</Text>
        <FontAwesomeIcon
          icon={isCollapsed ? faChevronDown : faChevronUp}
          size={16}
        />
      </View>
    </Pressable>
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
            style={{width: 16, height: 16, borderRadius: 100}}
          />
        </View>
        <View style={styles.itemLeftInfo}>
          <Text style={typography.b1}>{account.name}</Text>
          <Text style={[typography.b2, {color: colors.black[0]}]}>
            {account.type}
          </Text>
        </View>
      </View>
      <View style={styles.itemRight}>
        <Text style={typography.b1}>{account.value}</Text>
        <Text style={[typography.b2, {color: colors.black[0]}]}>
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
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <View style={styles.container}>
      <AccountCardHeader
        item={item}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      {!isCollapsed &&
        item.accounts.map((account, index) => {
          const isLast = index === item.accounts.length - 1;
          return (
            <AccountCardItem
              account={account}
              key={`${account.name}${account.value}`}
              isLast={isLast}
            />
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borders.radius,
    overflow: 'hidden',
  },
  header: {
    height: 65,
    paddingTop: 10,
    paddingLeft: spacing.sides,
    paddingRight: spacing.sides,
    paddingBottom: 10,
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
    backgroundColor: colors.gray[0],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[10],
    paddingTop: 10,
    paddingLeft: spacing.sides,
    paddingRight: spacing.sides,
    paddingBottom: 10,
    height: 65,
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

import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faGear,
  faHouse,
  faQuestion,
  faRightLeft,
} from '@fortawesome/free-solid-svg-icons';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

import {colors} from '../styles/styleVariables';
import {RootStackParamList} from '../../App';

export default function BottomNavBar({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) {
  return (
    <SafeAreaView style={styles.container}>
      {state.routes.map((route, index) => {
        const isSelected = state.index === index;
        const routeName = route.name as keyof RootStackParamList;
        let icon: IconProp;

        switch (routeName) {
          case 'Net Worth':
            icon = faHouse;
            break;
          case 'Transactions':
            icon = faRightLeft;
            break;
          case 'Settings':
            icon = faGear;
            break;
          default:
            icon = faQuestion;
        }

        return (
          <TouchableOpacity
            key={route.name}
            disabled={isSelected}
            style={[styles.item, isSelected && styles.selectedItem]}
            onPress={() => navigation.navigate(routeName)}>
            <FontAwesomeIcon
              size={20}
              icon={icon}
              color={isSelected ? colors.eggplant[20] : colors.gray[50]}
            />
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: colors.white,
    justifyContent: 'space-around',
  },
  item: {
    borderTopColor: colors.white,
    borderTopWidth: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: {
    borderTopColor: colors.eggplant[10],
  },
});

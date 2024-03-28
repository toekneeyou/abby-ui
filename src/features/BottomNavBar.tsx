import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faDollar,
  faGear,
  faHouse,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

import {colors} from '../styles/styleVariables';
import {
  RootStackParamList,
  getIsAppLoading,
  getIsAuthenticated,
  setCurrentRoute,
} from '../store/generalStore';
import {useAppDispatch, useAppSelector} from '../store/store';
import {setLayout} from '@store/layoutStore';

export default function BottomNavBar({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) {
  const dispatch = useAppDispatch();
  const isAppLoading = useAppSelector(getIsAppLoading);
  const isAuthenticated = useAppSelector(getIsAuthenticated);

  if (isAppLoading || !isAuthenticated) return null;

  const handleLayout = (e: LayoutChangeEvent) => {
    dispatch(
      setLayout({
        name: 'BottomNavBar',
        layout: e.nativeEvent.layout,
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container} onLayout={handleLayout}>
      {state.routes.map((route, index) => {
        const isSelected = state.index === index;
        const routeName = route.name as keyof RootStackParamList;
        let icon: IconProp;

        switch (routeName) {
          case 'Home':
            icon = faHouse;
            break;
          case 'Transactions':
            icon = faDollar;
            break;
          case 'Settings':
            icon = faGear;
            break;
          case 'Login':
            return null;
          default:
            icon = faQuestion;
        }

        return (
          <TouchableOpacity
            key={route.name}
            disabled={isSelected}
            style={[styles.item, isSelected && styles.selectedItem]}
            onPress={() => {
              dispatch(setCurrentRoute(routeName));
              navigation.navigate(routeName);
            }}>
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
    backgroundColor: colors.white,
    justifyContent: 'space-around',
  },
  item: {
    borderTopColor: colors.white,
    borderTopWidth: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  selectedItem: {
    borderTopColor: colors.pistachio[20],
  },
});

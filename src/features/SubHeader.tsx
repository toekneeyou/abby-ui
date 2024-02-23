import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';

import {colors, spacing} from '../styles/styleVariables';
import {
  componentNames,
  getIsSubHeaderShown,
  heights,
  zIndices,
} from '../store/layoutStore';
import NetWorthSubHeader from './NetWorthScreenSubHeader';
import {useAppSelector} from '../store/store';
import {getCurrentRoute} from '../store/generalStore';

export default function SubHeader() {
  const currentRoute = useAppSelector(getCurrentRoute);
  const headerAnim = useRef(new Animated.Value(0)).current;
  const isSubHeaderShown = useAppSelector(getIsSubHeaderShown);

  let SubHeader = NetWorthSubHeader;

  useEffect(() => {
    switch (currentRoute) {
      case 'Net Worth':
        SubHeader = NetWorthSubHeader;
        break;
      case 'Transactions':
        SubHeader = NetWorthSubHeader;
        break;
      case 'Settings':
        SubHeader = NetWorthSubHeader;
        break;
      default:
    }
  }, [currentRoute]);

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: isSubHeaderShown ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isSubHeaderShown]);

  return (
    <Animated.View
      style={[
        styles.subHeader,
        {
          height: heights.subHeader,
          transform: [
            {
              translateY: headerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, heights.subHeader as number],
              }),
            },
          ],
          shadowOpacity: headerAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.05],
          }),
        },
      ]}>
      <SubHeader />
    </Animated.View>
  );
}

SubHeader.name = componentNames.subHeader;

const styles = StyleSheet.create({
  subHeader: {
    paddingLeft: spacing.sides,
    paddingRight: spacing.sides,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    zIndex: zIndices.subHeader,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
});

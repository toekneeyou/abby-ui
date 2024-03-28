import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';

import {colors, spacing} from '../styles/styleVariables';
import {getIsSubHeaderShown, heights, zIndices} from '../store/layoutStore';
import HomeScreenSubHeader from './HomeScreenSubHeader';
import {useAppSelector} from '../store/store';
import {getCurrentRoute} from '../store/generalStore';

export default function SubHeader() {
  const currentRoute = useAppSelector(getCurrentRoute);
  const headerAnim = useRef(new Animated.Value(0)).current;
  const isSubHeaderShown = useAppSelector(getIsSubHeaderShown);

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
      {currentRoute === 'Home' && <HomeScreenSubHeader />}
    </Animated.View>
  );
}

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

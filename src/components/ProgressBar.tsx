import {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, LayoutChangeEvent, StyleSheet, View} from 'react-native';

import {heights} from '@store/layoutStore';
import {colors} from '@styles/styleVariables';

type ProgressBarProps = {
  isInProgress: boolean;
  continuous?: boolean;
  color?: string;
  progress?: number;
};
export default function ProgressBar({
  isInProgress,
  continuous,
  color = colors.eggplant[20],
  progress,
}: ProgressBarProps) {
  const innerBarAnim = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const startContinuousAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(innerBarAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(innerBarAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const stopAnimation = useCallback(() => {
    innerBarAnim.stopAnimation();
  }, []);

  useEffect(() => {
    if (continuous && isInProgress) {
      startContinuousAnimation();
    }

    return () => {
      stopAnimation();
    };
  }, [continuous, isInProgress]);

  return (
    <View style={[styles.progressBar]} onLayout={handleLayout}>
      {isInProgress && (
        <Animated.View
          style={[
            styles.innerBar,
            {
              width: width / 2,
              backgroundColor: color,
              transform: [
                {
                  translateX: innerBarAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-width, width], // Move from -100 to 100
                  }),
                },
              ],
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    minHeight: heights.progressBar,
    width: '100%',
    backgroundColor: colors.white,
  },
  innerBar: {minHeight: heights.progressBar},
});

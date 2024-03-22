import React, {useState} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';

import {useChartPath} from '@hooks/useChartPath';
import {colors} from '@styles/styleVariables';

export type ChartData<T> = T extends {value: number} ? T : never;
export type ChartProps<T> = {
  data: ChartData<T>[];
  height: number;
};

export default function Chart<T>({data, height = 130}: ChartProps<T>) {
  const [layout, setLayout] = useState<
    {width: number; height: number} | undefined
  >();
  const {pathData, xCoords, yCoords} = useChartPath({
    data,
    height: layout?.height,
    width: layout?.width,
  });

  const handleChartLayout = (e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout);
  };

  return (
    <View style={[styles.chart, {height}]} onLayout={handleChartLayout}>
      <View style={{height: 5}} />
      {!!layout && (
        <Svg
          width={layout.width - 6}
          height={layout.height - 6}
          viewBox={`-4 -4 ${layout.width} ${layout.height}`}>
          {!!pathData && (
            <Path
              strokeLinecap="square"
              d={pathData}
              stroke={colors.pistachio[20]}
              strokeWidth={5}
              fill="none"
            />
          )}
        </Svg>
      )}
      <View style={{height: 5}} />
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

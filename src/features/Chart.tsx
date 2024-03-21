import {colors} from '@styles/styleVariables';
import jestConfig from 'jest.config';
import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import {Path, Svg} from 'react-native-svg';

const data = [
  0, 1, 1000, 1100, 100, 1000, 200, 1324, 10, -1211, 1032, 1943, 5000, 200,
  3000, -20, 100, 1020, 239, 199, 1200, 1000,
];

type ChartProps = {
  height?: number;
};

export default function Chart({height = 130}: ChartProps) {
  const [pathData, setPathData] = useState('');

  useEffect(() => {
    let max = data[0];
    let min = data[0];
    for (let i = 0; i < data.length; i++) {
      if (data[i] > max) {
        max = data[i];
      } else if (data[i] < min) {
        min = data[i];
      }
    }

    let pixelValue = (max - min) / 110;
    const xStep = Dimensions.get('window').width / (data.length - 1);
    const isMinNegative = min < 0;
    const adjustedData = data.map(d => {
      if (isMinNegative) {
        return 120 - Math.round((d + Math.abs(min)) / pixelValue);
      } else {
        return 110 - Math.round((d - Math.abs(min)) / pixelValue);
      }
    });

    let newPathData = '';

    let x = 0;
    for (let i = 0; i < adjustedData.length; i++) {
      const isFirst = i === 0;
      const y = adjustedData[i];
      console.log(x, y);

      if (isFirst) {
        newPathData += `M ${x} ${y}`;
      } else {
        newPathData += ` L ${x} ${y}`;
      }

      x += xStep;
    }

    setPathData(newPathData);
  }, [data]);

  return (
    <View
      style={{
        height,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Svg>
        <Path
          strokeLinecap="square"
          d={pathData}
          stroke={colors.pistachio[20]}
          strokeWidth={5}
          fill="none"
        />
      </Svg>
    </View>
  );
}

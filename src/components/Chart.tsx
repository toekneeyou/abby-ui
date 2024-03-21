import {NetWorth} from '@store/financialDataStore';
import {colors} from '@styles/styleVariables';
import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {netWorthsData} from '../mockData/netWorthsData';

type ChartProps = {
  height?: number;
  data?: NetWorth[];
};

export default function Chart({
  height = 130,
  data = netWorthsData,
}: ChartProps) {
  const [pathData, setPathData] = useState('');

  useEffect(() => {
    if (data.length > 0) {
      let max = +data[0].amount;
      let min = +data[0].amount;
      for (let i = 0; i < data.length; i++) {
        const amount = +data[i].amount;
        if (amount > max) {
          max = amount;
        } else if (amount < min) {
          min = amount;
        }
      }

      let pixelValue = (max - min) / 110;
      const xStep = Dimensions.get('window').width / (data.length - 1);
      const isMinNegative = min < 0;
      const adjustedData = data.map(d => {
        const amount = +d.amount;
        if (isMinNegative) {
          return 120 - Math.round((amount + Math.abs(min)) / pixelValue);
        } else {
          return 110 - Math.round((amount - Math.abs(min)) / pixelValue);
        }
      });

      let newPathData = '';

      let x = 0;
      for (let i = 0; i < adjustedData.length; i++) {
        const isFirst = i === 0;
        const y = adjustedData[i];

        if (isFirst) {
          newPathData += `M ${x} ${y}`;
        } else {
          newPathData += ` L ${x} ${y}`;
        }

        x += xStep;
      }

      setPathData(newPathData);
    }
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

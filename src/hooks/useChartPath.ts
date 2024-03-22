import {useEffect, useState} from 'react';

import {ChartData} from '@components/Chart';

export type UseChartPathParams<T> = {
  data: ChartData<T>[];
  height: number | undefined;
  width: number | undefined;
};
export const useChartPath: <T>(params: UseChartPathParams<T>) => {
  pathData: string | undefined;
  xCoords: number[] | undefined;
  yCoords: number[] | undefined;
} = ({data, width, height}) => {
  const [pathData, setPathData] = useState<string | undefined>();
  const [xCoords, setXCoords] = useState<number[]>();
  const [yCoords, setYCoords] = useState<number[]>();

  useEffect(() => {
    if (
      data.length > 0 &&
      typeof height === 'number' &&
      typeof width === 'number'
    ) {
      // calculate x coordinates
      const xStep = width / (data.length - 1);
      const newXCoords: number[] = [];
      for (let i = 0; i < data.length; i++) {
        const newStep = Math.round(xStep * i);
        newXCoords.push(newStep);
      }
      setXCoords(newXCoords);
      // calculate y coordinates
      // need to offset height because svg path protrudes out of height boundaries
      const offsetHeight = height - 20;
      // find max and min values in data
      let max = data[0].value;
      let min = data[0].value;
      for (let i = 0; i < data.length; i++) {
        const value = data[i].value;
        if (value > max) {
          max = value;
        } else if (value < min) {
          min = value;
        }
      }
      let yPixelValue = (max - min) / height;
      const isMinNegative = min < 0;
      const newYCoords = data.map(d => {
        const value = d.value;
        if (isMinNegative) {
          return height - Math.round((value + Math.abs(min)) / yPixelValue);
        } else {
          return height - Math.round((value - Math.abs(min)) / yPixelValue);
        }
      });
      setYCoords(newYCoords);
      // create path
      let newPathData = '';
      for (let i = 0; i < newYCoords.length; i++) {
        const isFirst = i === 0;
        const x = newXCoords[i];
        const y = newYCoords[i];
        if (isFirst) {
          newPathData += `M ${x} ${y}`;
        } else {
          newPathData += ` L ${x} ${y}`;
        }
      }
      setPathData(newPathData);
    }
  }, [data, height, width]);

  return {pathData, xCoords, yCoords};
};

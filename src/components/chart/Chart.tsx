import * as d3 from 'd3';
import {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Circle, G, Line, Path, Svg} from 'react-native-svg';
import {usePanResponder} from '@components/chart/usePanResponder';
import {colors} from '@styles/styleVariables';

export type ChartDataPoint = {
  x: number;
  y: number;
};
export type ChartClosestPoint = {
  index: number | null;
  point: ChartDataPoint | null;
};
type ChartProps = {
  data: ChartDataPoint[];
  width: number;
  height: number;
  onPanStart?: () => void;
  onPanEnd?: () => void;
  onPanMove?: (closest: ChartClosestPoint) => void;
};

const MARGIN = 10;

export default function Chart({
  data,
  height,
  width,
  onPanStart,
  onPanMove,
  onPanEnd,
}: ChartProps) {
  const [isPanning, setIsPanning] = useState(false);
  const [dataPoints, setDataPoints] = useState<ChartDataPoint[]>(data);
  const [cursorPosition, setCursorPosition] = useState<ChartDataPoint | null>(
    null,
  );
  const panResponder = usePanResponder();
  // the actual height and width of the svg
  const boundedHeight = height - MARGIN;
  const boundedWidth = width - MARGIN;

  // y-axis
  const [yMin, yMax] = d3.extent(dataPoints, d => d.y);
  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, yMax ?? 0])
      .range([boundedHeight, 0]);
  }, [dataPoints, height]);

  // x-axis
  const [xMin, xMax] = d3.extent(dataPoints, d => d.x);
  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, xMax ?? 0])
      .range([0, boundedWidth]);
  }, [dataPoints, width]);

  // update data points to fit in bounded width and height
  useEffect(() => {
    setDataPoints(() => {
      const xScale = d3.scaleLinear([0, data.length - 1], [0, boundedWidth]);
      const newXCoords = new Array(data.length).fill(0).map((_, i) => {
        return Math.round(xScale(i));
      });
      const [yMin, yMax] = d3.extent(data, d => d.y);
      const yScale = d3.scaleLinear([yMin ?? 0, yMax ?? 0], [0, boundedHeight]);
      const newYCoords = data.map(d => {
        return Math.round(yScale(d.y));
      });
      return newYCoords.map((d, i) => {
        return {x: newXCoords[i], y: newYCoords[i]};
      });
    });
  }, [data, width, height]);

  // draw path
  const linePath = useMemo(() => {
    const lineBuilder = d3
      .line<ChartDataPoint>()
      .x(d => d.x)
      .y(d => d.y);
    return lineBuilder(dataPoints);
  }, [dataPoints]);

  // center path
  const pathOffset = useMemo(() => {
    const centerX = width / 2;
    const centerY = height / 2;
    // Calculate the offset needed to center the path
    const xOffset = centerX - boundedWidth / 2;
    const yOffset = centerY - boundedHeight / 2;
    return `translate(${xOffset}, ${yOffset})`;
  }, [width, height]);

  // get closest data point to cursor position
  const getClosestPoint = (cursorPixelPosition: number) => {
    const x = xScale.invert(cursorPixelPosition);

    let minDistance = Infinity;
    let closetPoint: ChartDataPoint | null = null;
    let xIndex: number | null = null;

    for (let i = 0; i < dataPoints.length; i++) {
      const point = dataPoints[i];
      const distance = Math.abs(point.x - x);
      if (distance < minDistance) {
        minDistance = distance;
        closetPoint = point;
        xIndex = i;
      }
    }

    return {index: xIndex, point: closetPoint};
  };

  useEffect(() => {
    setCursorPosition(dataPoints[dataPoints.length - 1]);
    panResponder.panHandlers.onResponderMove = e => {
      const closest = getClosestPoint(e.nativeEvent.locationX);
      setCursorPosition(closest.point);
      onPanMove?.(closest);
    };
  }, [dataPoints, onPanMove]);

  useEffect(() => {
    panResponder.panHandlers.onResponderRelease = e => {
      setIsPanning(false);
      setCursorPosition(dataPoints[dataPoints.length - 1]);
      onPanEnd?.();
    };
    panResponder.panHandlers.onResponderTerminate = e => {
      setIsPanning(false);
      setCursorPosition(dataPoints[dataPoints.length - 1]);
      onPanEnd?.();
    };
  }, [dataPoints, onPanEnd]);

  useEffect(() => {
    panResponder.panHandlers.onResponderGrant = e => {
      setIsPanning(true);
      const closest = getClosestPoint(e.nativeEvent.locationX);
      setCursorPosition(closest.point);
      onPanStart?.();
    };
  }, [dataPoints, onPanStart]);

  return (
    <View style={[styles.chart]} {...panResponder.panHandlers}>
      <Svg height={height} width={width}>
        <G width={boundedWidth} height={boundedHeight} transform={pathOffset}>
          <Path
            d={linePath as string}
            stroke={colors.pistachio[20]}
            strokeWidth={5}
            fill="none"
          />
          {cursorPosition && (
            <>
              <Circle
                cx={cursorPosition.x}
                y={cursorPosition.y}
                r={4}
                fill={colors.tomato[30]}
                stroke={colors.tomato[10]}
                strokeWidth={2}
              />
              {isPanning && (
                <Line
                  x1={cursorPosition.x}
                  y1={0}
                  x2={cursorPosition.x}
                  y2={boundedHeight}
                  stroke={colors.tomato[30]}
                  strokeWidth="2"
                  strokeDasharray="2 2"
                />
              )}
            </>
          )}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {backgroundColor: colors.white},
});

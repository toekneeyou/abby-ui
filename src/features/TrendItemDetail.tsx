import {returnCurrency} from '@services/helper';
import {heights, paddings} from '@store/layoutStore';
import {useAppSelector} from '@store/store';
import {getSelectedTrendItem} from '@store/trendsStore';
import {typography} from '@styles/globalStyles';
import {colors} from '@styles/styleVariables';
import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function TrendItemDetail() {
  const selectedTrendItem = useAppSelector(getSelectedTrendItem);

  const valueDisplay = useMemo(() => {
    if (selectedTrendItem) {
      const [dollars, cents] = returnCurrency(selectedTrendItem.value).split(
        '.',
      );
      return {dollars, cents: cents.padStart(2, '0')};
    }
  }, [selectedTrendItem?.value]);

  const dateDisplay = useMemo(() => {
    if (selectedTrendItem) {
      const date = new Date(selectedTrendItem.date);
      let month: string | number = date.getUTCMonth();
      let day = String(date.getUTCDate());
      let year = String(date.getUTCFullYear());

      switch (month) {
        case 0:
          month = 'Jan';
          break;
        case 1:
          month = 'Feb';
          break;
        case 2:
          month = 'Mar';
          break;
        case 3:
          month = 'Apr';
          break;
        case 4:
          month = 'May';
          break;
        case 5:
          month = 'Jun';
          break;
        case 6:
          month = 'Jul';
          break;
        case 7:
          month = 'Aug';
          break;
        case 8:
          month = 'Sep';
          break;
        case 9:
          month = 'Oct';
          break;
        case 10:
          month = 'Nov';
          break;
        case 11:
          month = 'Dec';
          break;
        default:
          month = '';
      }

      return `${month} ${day}, ${year}`;
    }
  }, [selectedTrendItem?.date]);

  if (!selectedTrendItem) return null;

  return (
    <View style={[styles.trendItemDetail]}>
      <View style={[styles.value]}>
        <Text style={[styles.dollars, typography.h1]}>
          {valueDisplay?.dollars}
        </Text>
        <Text style={[styles.cents, typography.b2]}>
          .{valueDisplay?.cents}
        </Text>
      </View>
      <View style={[styles.sub]}>
        <View style={[styles.subLeft]}>
          <Text
            style={[
              typography.b2,
              {color: colors.gray[30], fontWeight: 'bold'},
            ]}>
            {dateDisplay}
          </Text>
        </View>
        <View style={[styles.subRight]}>
          <Text></Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  trendItemDetail: {
    alignItems: 'center',
    height: 90,
    backgroundColor: colors.white,
    paddingHorizontal: paddings.trendDetail.h,
    paddingTop: paddings.trendDetail.v,
    rowGap: 4,
  },
  value: {flexDirection: 'row', alignItems: 'flex-start'},
  dollars: {lineHeight: 40},
  cents: {fontWeight: 'bold'},
  sub: {flexDirection: 'row'},
  subLeft: {},
  subRight: {},
});

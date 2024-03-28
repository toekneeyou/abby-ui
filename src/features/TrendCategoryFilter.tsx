import Chip from '@components/Chip';
import {heights, paddings} from '@store/layoutStore';
import {useAppDispatch, useAppSelector} from '@store/store';
import {
  TrendCategories,
  getSelectedTrendCategory,
  setSelectedTrendCategory,
} from '@store/trendsStore';
import {typography} from '@styles/globalStyles';
import {colors} from '@styles/styleVariables';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function TrendCategoryFilter() {
  const dispatch = useAppDispatch();
  const selectedTrendCategory = useAppSelector(getSelectedTrendCategory);
  const [selectedWidth, setSelectedWidth] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);

  const handleLayout = (e: LayoutChangeEvent) => {
    setSelectedWidth(e.nativeEvent.layout.width);
  };

  return (
    <View style={[styles.trendCategoryFilter]}>
      <View style={[styles.selected]} onLayout={handleLayout}>
        <Chip label={selectedTrendCategory} color="pistachio" />
      </View>

      <ScrollView
        ref={scrollRef}
        style={{width: Dimensions.get('screen').width - selectedWidth - 20}}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.others]}>
        {Object.values(TrendCategories).map(category => {
          if (category !== selectedTrendCategory) {
            return (
              <Pressable
                key={category}
                onPress={() => {
                  dispatch(setSelectedTrendCategory(category));
                  if (scrollRef.current) {
                    scrollRef.current.scrollTo({x: 0});
                  }
                }}>
                <Text
                  style={[
                    typography.b2,
                    {fontWeight: 'bold', color: colors.eggplant[30]},
                  ]}>
                  {category}
                </Text>
              </Pressable>
            );
          }
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  trendCategoryFilter: {
    height: heights.trendCategoryFilter,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingRight: 0,
    paddingLeft: paddings.trendCategoryFilter.h,
    paddingVertical: paddings.trendCategoryFilter.v,
  },
  selected: {
    borderRightWidth: 1,
    borderRightColor: colors.eggplant[30],
    paddingRight: 12,
  },
  others: {flexDirection: 'row', columnGap: 16, paddingHorizontal: 12},
});

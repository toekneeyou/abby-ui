import {typography} from '@styles/globalStyles';
import {colors} from '@styles/styleVariables';
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

type ChipProps = {
  label: string;
  onPress?: (arg?: any) => void;
  type?: ChipType;
  color?: ChipColor;
};

type ChipType = 'filled' | 'outlined' | 'text';
export type ChipColor = 'eggplant' | 'gray' | 'black' | 'tomato' | 'pistachio';

export default function Chip({
  label,
  onPress,
  type = 'filled',
  color = 'eggplant',
}: ChipProps) {
  let backgroundColor;
  let fontColor;
  let borderColor;
  switch (type) {
    case 'outlined':
      backgroundColor = 'transparent';
      fontColor = colors[color][30];
      borderColor = colors[color][30];
      break;
    case 'text':
      backgroundColor = 'transparent';
      fontColor = colors[color][30];
      borderColor = 'transparent';
      break;
    case 'filled':
    default:
      backgroundColor = colors[color][30];
      fontColor = colors.white;
      borderColor = colors[color][30];
  }
  return (
    <Pressable
      style={[styles.chip, {backgroundColor, borderColor}]}
      disabled={!onPress}
      onPress={onPress}>
      <Text style={[typography.b2, {color: fontColor, fontWeight: 'bold'}]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 50,
    borderWidth: 1,
    paddingHorizontal: 15,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

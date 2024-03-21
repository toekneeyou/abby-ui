import {typography} from '@styles/globalStyles';
import {colors} from '@styles/styleVariables';
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

type ChipProps = {
  label: string;
  onPress?: (arg?: any) => void;
  type?: ChipType;
};

type ChipType = 'filled' | 'outlined' | 'text';

export default function Chip({label, onPress, type = 'filled'}: ChipProps) {
  let backgroundColor;
  let fontColor;
  let borderColor;
  switch (type) {
    case 'outlined':
      backgroundColor = 'transparent';
      fontColor = colors.eggplant[20];
      borderColor = colors.eggplant[20];
      break;
    case 'text':
      backgroundColor = 'transparent';
      fontColor = colors.eggplant[20];
      borderColor = 'transparent';
      break;
    case 'filled':
    default:
      backgroundColor = colors.eggplant[20];
      fontColor = colors.white;
      borderColor = colors.eggplant[20];
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
    paddingHorizontal: 10,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

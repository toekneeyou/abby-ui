import React from 'react';
import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';
import {colors} from '../styles/styleVariables';
import {typography} from '../styles/globalStyles';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export type ButtonType = 'filled' | 'outlined' | 'text';
export type ButtonColor =
  | 'eggplant'
  | 'gray'
  | 'black'
  | 'tomato'
  | 'pistachio';
export type ButtonSize = 'compact' | 'regular' | 'jumbo';

type ButtonProps = PressableProps & {
  type?: ButtonType;
  label: string;
  icon?: IconProp;
  color?: ButtonColor;
  size?: ButtonSize;
};

export default function Button({
  label = '',
  disabled = false,
  type = 'filled',
  icon,
  color = 'eggplant',
  size = 'regular',
  ...props
}: ButtonProps) {
  let backgroundColor: string;
  let fontColor: string;
  let borderColor: string;
  let height: number;
  let fontSize;
  let paddingHorizontal: number;
  let paddingVertical: number;

  switch (type) {
    case 'filled':
      backgroundColor = colors[color][20];
      fontColor = colors.white;
      borderColor = colors[color][20];
      break;
    case 'outlined':
      backgroundColor = 'transparent';
      fontColor = colors[color][20];
      borderColor = colors[color][20];
      break;
    case 'text':
      backgroundColor = 'transparent';
      fontColor = colors[color][20];
      borderColor = 'transparent';
      break;
    default:
      backgroundColor = colors[color][20];
      fontColor = colors.white;
      borderColor = colors[color][20];
  }

  switch (size) {
    case 'compact':
      height = 40;
      fontSize = typography.b2;
      paddingHorizontal = 10;
      paddingVertical = 5;
      break;
    case 'regular':
      height = 50;
      fontSize = typography.b1;
      paddingHorizontal = 20;
      paddingVertical = 10;
      break;
    case 'jumbo':
      height = 60;
      fontSize = typography.b1;
      paddingHorizontal = 20;
      paddingVertical = 10;
      break;
    default:
      height = 50;
      fontSize = typography.b1;
      paddingHorizontal = 20;
      paddingVertical = 10;
  }

  return (
    <Pressable
      {...props}
      style={({pressed}) => {
        switch (type) {
          case 'filled':
            backgroundColor = pressed ? colors[color][40] : colors[color][20];
            break;
          case 'outlined':
            backgroundColor = pressed ? colors[color][40] : 'transparent';
            break;
          case 'text':
            backgroundColor = pressed ? colors[color][40] : 'transparent';
            break;
          default:
            backgroundColor = pressed ? colors[color][40] : colors[color][20];
        }

        return [
          styles.button,
          {
            backgroundColor,
            borderColor,
            height,
            paddingHorizontal,
            paddingVertical,
          },
        ];
      }}>
      {!!icon && <FontAwesomeIcon icon={icon} color={fontColor} />}
      <Text style={[fontSize, {color: fontColor, fontWeight: 'bold'}]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 2,
    flexDirection: 'row',
    columnGap: 5,
  },
});

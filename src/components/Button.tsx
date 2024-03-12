import React from 'react';
import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';
import {colors} from '../styles/styleVariables';
import {typography} from '../styles/globalStyles';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export type ButtonType = 'filled' | 'outlined' | 'text';

type ButtonProps = PressableProps & {
  type?: ButtonType;
  label: string;
  icon?: IconProp;
};

export default function Button({
  label = '',
  disabled = false,
  type = 'filled',
  icon,
  ...props
}: ButtonProps) {
  let backgroundColor: string;
  let fontColor: string;
  let borderColor: string;

  switch (type) {
    case 'filled':
      backgroundColor = colors.eggplant[20];
      fontColor = colors.white;
      borderColor = colors.eggplant[20];
      break;
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
    default:
      backgroundColor = colors.eggplant[20];
      fontColor = colors.white;
      borderColor = colors.eggplant[20];
  }

  return (
    <Pressable
      {...props}
      style={({pressed}) => {
        switch (type) {
          case 'filled':
            backgroundColor = pressed
              ? colors.eggplant[10]
              : colors.eggplant[20];
            break;
          case 'outlined':
            backgroundColor = pressed ? colors.eggplant[10] : 'transparent';
            break;
          case 'text':
            backgroundColor = pressed ? colors.eggplant[10] : 'transparent';
            break;
          default:
            backgroundColor = pressed
              ? colors.eggplant[10]
              : colors.eggplant[20];
        }

        return [styles.button, {backgroundColor, borderColor}];
      }}>
      {!!icon && <FontAwesomeIcon icon={icon} color={fontColor} />}
      <Text style={[typography.b1, {color: fontColor, fontWeight: 'bold'}]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 2,
    flexDirection: 'row',
    columnGap: 5,
  },
});

import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {colors} from '../styles/styleVariables';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

type IconButtonTypes = 'filled' | 'outlined' | 'text';

export type IconButtonProps = {
  color?: string;
  icon: IconProp;
  label?: string;
  type?: IconButtonTypes;
  onPressHandler: (arg?: any) => void;
};

const returnColor = (type: IconButtonTypes, color?: string) => {
  let backgroundColor = colors.eggplant[20];
  let borderColor = colors.eggplant[20];
  let iconColor = colors.white;

  switch (type) {
    case 'filled':
      if (color) {
        backgroundColor = color;
        borderColor = color;
      }
      break;
    case 'outlined':
      backgroundColor = 'transparent';
      iconColor = color ?? colors.eggplant[20];
      borderColor = color ?? colors.eggplant[20];
      break;
    case 'text':
      backgroundColor = 'transparent';
      borderColor = 'transparent';
      iconColor = color ?? colors.eggplant[20];
      break;
    default:
      break;
  }

  return {borderColor, backgroundColor, iconColor};
};

export default function IconButton({
  color,
  icon,
  label,
  type = 'filled',
  onPressHandler,
}: IconButtonProps): React.JSX.Element {
  const {backgroundColor, borderColor, iconColor} = returnColor(type, color);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
        },
      ]}
      onPress={onPressHandler}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={label}>
      <FontAwesomeIcon icon={icon} size={20} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
  },
});

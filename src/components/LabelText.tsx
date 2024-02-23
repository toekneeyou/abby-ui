import React from 'react';
import {Text, TextProps} from 'react-native';
import {typography} from '../styles/globalStyles';

type LabelText = 'l1' | 'l2' | 'l3';

type LabelTextProps = TextProps & {
  type?: LabelText;
};

export default function LabelText({
  children,
  style,
  type = 'l1',
  ...props
}: LabelTextProps) {
  return (
    <Text style={[typography[type], style]} {...props}>
      {children}
    </Text>
  );
}

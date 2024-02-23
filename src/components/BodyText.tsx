import React from 'react';
import {Text, TextProps} from 'react-native';
import {typography} from '../styles/globalStyles';

type BodyText = 'b1' | 'b2' | 'b3';

type BodyTextProps = TextProps & {
  type?: BodyText;
};

export default function BodyText({
  children,
  style,
  type = 'b1',
  ...props
}: BodyTextProps) {
  return (
    <Text style={[typography[type], style]} {...props}>
      {children}
    </Text>
  );
}

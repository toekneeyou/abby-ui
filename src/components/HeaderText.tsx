import React from 'react';
import {Text, TextProps} from 'react-native';
import {typography} from '../styles/globalStyles';

type HeaderText = 'h1' | 'h2' | 'h3';

type HeaderTextProps = TextProps & {
  type?: HeaderText;
};

export default function HeaderText({
  children,
  style,
  type = 'h1',
  ...props
}: HeaderTextProps) {
  return (
    <Text style={[typography[type], style]} {...props}>
      {children}
    </Text>
  );
}

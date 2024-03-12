import React, {useState} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {colors} from '../styles/styleVariables';
import {typography} from '../styles/globalStyles';

type InputProps = TextInputProps & {};

export default function Input(props: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
      style={[
        typography.b1,
        styles.input,
        {backgroundColor: !!props.value ? colors.white : colors.gray[10]},
        props.style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 50,
    minWidth: 200,
    maxWidth: '100%',
    color: colors.black[10],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: colors.white
  },
});

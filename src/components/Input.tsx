import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {colors} from '../styles/styleVariables';
import {typography} from '../styles/globalStyles';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import IconButton from './IconButton';

type InputProps = Omit<TextInputProps, 'secureTextEntry'> & {
  isSecure?: boolean;
};

export default function Input({isSecure = false, ...props}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [layout, setLayout] = useState<LayoutRectangle>();
  const inputAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout);
  };

  useEffect(() => {
    Animated.timing(inputAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  return (
    <View style={[styles.inputContainer, props.style]} onLayout={handleLayout}>
      <Animated.View
        style={[
          styles.shadow,
          {
            transform: [
              {
                translateY: inputAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 3],
                }),
              },
              {
                translateX: inputAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 3],
                }),
              },
            ],
            height: layout?.height,
            width: layout?.width,
          },
        ]}
      />
      <View style={styles.secureInput}>
        <TextInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
          style={[typography.b1, styles.input]}
          secureTextEntry={showInput}
          ref={inputRef}
        />
        {isSecure && (
          <IconButton
            icon={showInput ? faEye : faEyeSlash}
            onPressHandler={() => {
              setIsFocused(true);
              setShowInput(!showInput);
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
            type="text"
            style={{transform: [{translateX: 10}]}}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    minHeight: 50,
    minWidth: 200,
    maxWidth: '100%',
    borderRadius: 25,
    backgroundColor: colors.gray[10],
    position: 'relative',
  },
  secureInput: {
    flexDirection: 'row',
    zIndex: 1,
    backgroundColor: colors.gray[10],
    flex: 1,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  shadow: {
    backgroundColor: colors.pistachio[30],
    borderRadius: 25,
    position: 'absolute',
    opacity: 1,
    zIndex: 0,
  },

  input: {
    color: colors.black[10],
    backgroundColor: colors.gray[10],
    flex: 1,
  },
});

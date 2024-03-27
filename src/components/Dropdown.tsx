import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {zIndices} from '@store/layoutStore';
import {typography} from '@styles/globalStyles';
import {colors} from '@styles/styleVariables';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, Pressable, StyleSheet, Text} from 'react-native';

export type DropdownOption<T> = {
  icon?: IconProp;
  label: string;
  value: T;
  onSelect: (arg?: unknown) => void;
};

type DropdownProps<T> = {
  type?: 'filled' | 'outlined';
  size?: 'regular' | 'compact';
  options: DropdownOption<T>[];
  defaultSelection: DropdownOption<T> | undefined;
};

export default function Dropdown<T>({
  type = 'filled',
  options,
  size = 'regular',
  defaultSelection,
}: DropdownProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    DropdownOption<T> | undefined
  >(defaultSelection);
  const menuAnim = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  const height = useMemo(() => {
    return size === 'regular' ? 44 : 34;
  }, [size]);

  const backgroundColor = useMemo(() => {
    return type === 'filled' ? colors.eggplant[30] : colors.white;
  }, [type]);
  const fontColor = useMemo(() => {
    return type === 'filled' ? colors.white : colors.eggplant[30];
  }, [type]);

  useEffect(() => {
    Animated.timing(menuAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  return (
    <Animated.View
      style={[
        styles.dropdown,
        {
          shadowOpacity: menuAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ]}>
      <Pressable onPress={toggleDropdown}>
        <Animated.View
          style={[
            styles.dropdownToggle,
            {
              backgroundColor,
              height,
              borderBottomStartRadius: menuAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
              borderBottomEndRadius: menuAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
          ]}>
          <Text style={[typography.b2, {textTransform: 'capitalize'}]}>
            {selectedOption?.label}
          </Text>
          <FontAwesomeIcon
            icon={isExpanded ? faCaretUp : faCaretDown}
            color={fontColor}
          />
        </Animated.View>
      </Pressable>
      <Animated.View
        style={[
          styles.dropdownMenu,
          {
            opacity: isExpanded ? 1 : 0,
            pointerEvents: isExpanded ? 'auto' : 'none',
          },
          !isExpanded && {maxHeight: 0},
        ]}>
        {options.sort().map((option, i) => {
          const isLast = i === options.length - 1;
          if (option.label !== selectedOption?.label) {
            const handleSelect = () => {
              setSelectedOption(option);
              option.onSelect();
              toggleDropdown();
            };

            return (
              <Pressable
                key={option.label}
                onPress={handleSelect}
                style={[
                  styles.dropdownItem,
                  {
                    height,
                    backgroundColor:
                      type === 'filled' ? colors.gray[0] : colors.white,
                  },
                  isLast && {
                    borderBottomEndRadius: 10,
                    borderBottomStartRadius: 10,
                  },
                ]}>
                {!!option.icon && <FontAwesomeIcon icon={option.icon} />}
                <Text style={{textTransform: 'capitalize'}}>
                  {option.label}
                </Text>
              </Pressable>
            );
          }
        })}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    zIndex: zIndices.dropdown,
    shadowColor: colors.pistachio[30],
    shadowOffset: {height: 2, width: 2},
    shadowRadius: 0,
  },
  dropdownToggle: {
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: 'row',
    columnGap: 5,
    borderColor: colors.eggplant[30],
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  dropdownMenu: {zIndex: 1},
  dropdownItem: {
    flexDirection: 'row',
    columnGap: 5,
    borderColor: colors.eggplant[30],
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

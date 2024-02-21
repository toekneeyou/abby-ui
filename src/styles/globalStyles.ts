import {StyleSheet} from 'react-native';
import {colors} from './styleVariables';

export const typography = StyleSheet.create({
  h1: {
    fontFamily: 'Roboto-Bold',
    fontSize: 40,
    color: colors.black[20],
    lineHeight: 40,
  },
  h2: {
    fontFamily: 'Roboto-Bold',
    fontSize: 28,
    lineHeight: 28,
    color: colors.black[20],
  },
  h3: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    lineHeight: 20,
    color: colors.black[20],
  },
  b1: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: colors.black[20],
  },
  b2: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: colors.black[20],
  },
  b3: {
    fontFamily: 'Roboto',
    fontSize: 12,
    lineHeight: 12,
    color: colors.black[20],
  },
  l1: {
    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 16,
    color: colors.black[20],
  },
  l2: {
    fontFamily: 'Roboto',
    fontSize: 14,
    lineHeight: 14,
    color: colors.black[20],
  },
  l3: {
    fontFamily: 'Roboto',
    fontSize: 12,
    lineHeight: 12,
    color: colors.black[20],
  },
});

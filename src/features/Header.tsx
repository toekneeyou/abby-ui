import React from 'react';
import {Animated, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {faAdd} from '@fortawesome/free-solid-svg-icons';

import {colors, spacing} from '../styles/styleVariables';
import HeaderText from '../components/HeaderText';
import IconButton from '../components/IconButton';
import {
  componentNames,
  heights,
  setLayout,
  zIndices,
} from '../store/layoutStore';
import SubHeader from './SubHeader';
import Logo from '../components/Logo';

type HeaderProps = {};

export default function Header({}: HeaderProps) {
  const handleLayout = (e: LayoutChangeEvent) => {
    setLayout({
      name: 'header',
      layout: e.nativeEvent.layout,
    });
  };

  return (
    <View style={styles.header} onLayout={handleLayout}>
      <Animated.View
        style={[
          styles.mainHeader,
          {
            height: heights.header,
          },
        ]}>
        <View style={styles.mainHeaderLeft}>
          <Logo width={70} />
        </View>
        <View style={styles.mainHeaderRight}>
          <IconButton
            icon={faAdd}
            type="text"
            onPressHandler={() => console.log('add')}
          />
        </View>
      </Animated.View>

      <SubHeader />
    </View>
  );
}

Header.name = componentNames.header;

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    backgroundColor: 'green',
    overflow: 'visible',
    zIndex: zIndices.header,
  },
  mainHeader: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: spacing.sides,
    paddingRight: spacing.sides,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: zIndices.header,
    position: 'relative',
    backgroundColor: colors.white,
  },
  mainHeaderLeft: {},
  mainHeaderRight: {},
});

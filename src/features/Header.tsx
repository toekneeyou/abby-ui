import React from 'react';
import {LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import {faAdd} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import PlaidLink, {PlaidLinkProps} from 'react-native-plaid-link-sdk';

import {colors} from '../styles/styleVariables';
import {heights, paddings, setLayout, zIndices} from '../store/layoutStore';
import SubHeader from './SubHeader';
import Logo from '../components/Logo';
import {useAppDispatch, useAppSelector} from '../store/store';
import {
  getCurrentRoute,
  getIsAppLoading,
  getIsAuthenticated,
  getIsSyncing,
} from '../store/generalStore';
import {typography} from '@styles/globalStyles';
import usePlaidLink from '@hooks/usePlaidLink';
import ProgressBar from '@components/ProgressBar';

type HeaderProps = {};
const SIDE_WIDTH = 60;

export default function Header({}: HeaderProps) {
  const currentRoute = useAppSelector(getCurrentRoute);
  const isAppLoading = useAppSelector(getIsAppLoading);
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const isSyncing = useAppSelector(getIsSyncing);
  const plaidConfig = usePlaidLink();

  if (isAppLoading || !isAuthenticated) return null;

  return (
    <View style={styles.header}>
      <View style={[styles.front]}>
        <View
          style={[
            styles.mainHeader,
            {
              height: heights.header - heights.progressBar,
            },
          ]}>
          <View style={styles.mainHeaderLeft}>
            <Logo width={SIDE_WIDTH} />
          </View>
          <View>
            <Text style={[typography.b2, {fontWeight: 'bold'}]}>
              {currentRoute}
            </Text>
          </View>
          <View style={styles.mainHeaderRight}>
            <PlaidLink {...(plaidConfig as PlaidLinkProps)}>
              <FontAwesomeIcon icon={faAdd} color={colors.eggplant[20]} />
            </PlaidLink>
          </View>
        </View>
        <ProgressBar isInProgress={isSyncing} continuous />
      </View>
      <SubHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    overflow: 'visible',
    zIndex: zIndices.header,
  },
  front: {
    zIndex: zIndices.header,
    height: heights.header,
    backgroundColor: colors.white,
  },
  mainHeader: {
    paddingHorizontal: paddings.header.h,
    height: heights.header,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  mainHeaderLeft: {width: SIDE_WIDTH},
  mainHeaderCenter: {flex: 1, justifyContent: 'center'},
  mainHeaderRight: {
    width: SIDE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

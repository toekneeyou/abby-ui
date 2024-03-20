import React from 'react';
import {Animated, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {faAdd} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import PlaidLink, {LinkExit, LinkSuccess} from 'react-native-plaid-link-sdk';
import {AxiosError} from 'axios';

import {colors, spacing} from '../styles/styleVariables';
import {heights, setLayout, zIndices} from '../store/layoutStore';
import SubHeader from './SubHeader';
import Logo from '../components/Logo';
import {useAppDispatch, useAppSelector} from '../store/store';
import {
  getError,
  getIsAppLoading,
  getIsAuthenticated,
  setError,
} from '../store/generalStore';
import {getLinkToken, getUser, setUser} from '@store/userStore';
import {
  FetchAccessTokenRequest,
  fetchAccessToken,
} from '@services/plaidService';
import {isDev} from '@services/helper';

type HeaderProps = {};

export default function Header({}: HeaderProps) {
  const dispatch = useAppDispatch();

  const isAppLoading = useAppSelector(getIsAppLoading);
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const linkToken = useAppSelector(getLinkToken);
  const user = useAppSelector(getUser);
  const error = useAppSelector(getError);

  if (isAppLoading || !isAuthenticated) return null;

  const handleLayout = (e: LayoutChangeEvent) => {
    setLayout({
      name: 'header',
      layout: e.nativeEvent.layout,
    });
  };

  const handleSuccess = async (success: LinkSuccess) => {
    try {
      const request: FetchAccessTokenRequest = {
        userId: user?.id as number,
        publicToken: success.publicToken,
      };
      const updatedUser = await fetchAccessToken(request);
      dispatch(setUser(updatedUser));
    } catch (error) {
      dispatch(setError(error as AxiosError));
    }
  };

  const handleExit = async (exit: LinkExit) => {
    if (isDev()) {
      console.log('exit', exit);
    }
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
          <PlaidLink
            tokenConfig={{token: linkToken as string, noLoadingState: true}}
            onSuccess={handleSuccess}
            onExit={handleExit}>
            <FontAwesomeIcon icon={faAdd} color={colors.eggplant[20]} />
          </PlaidLink>
        </View>
      </Animated.View>

      <SubHeader />
    </View>
  );
}

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

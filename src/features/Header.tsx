import React from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {faAdd} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import PlaidLink, {LinkExit, LinkSuccess} from 'react-native-plaid-link-sdk';
import {AxiosError} from 'axios';

import {colors, spacing} from '../styles/styleVariables';
import {heights, paddings, setLayout, zIndices} from '../store/layoutStore';
import SubHeader from './SubHeader';
import Logo from '../components/Logo';
import {useAppDispatch, useAppSelector} from '../store/store';
import {
  getCurrentRoute,
  getError,
  getIsAppLoading,
  getIsAuthenticated,
  setError,
} from '../store/generalStore';
import {getLinkToken, getUser} from '@store/userStore';
import {
  FetchAccessTokenRequest,
  fetchAccessToken,
} from '@services/plaidService';
import {isDev} from '@services/helper';
import {getInstitutions, setInstitutions} from '@store/financialDataStore';
import {useNavigation} from '@react-navigation/native';
import {typography} from '@styles/globalStyles';

type HeaderProps = {};
const SIDE_WIDTH = 60;

export default function Header({}: HeaderProps) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const currentRoute = useAppSelector(getCurrentRoute);

  const isAppLoading = useAppSelector(getIsAppLoading);
  const institutions = useAppSelector(getInstitutions);
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
      const newInstitution = await fetchAccessToken(request);
      dispatch(setInstitutions([...institutions, newInstitution]));
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
          <Logo width={SIDE_WIDTH} />
        </View>
        <View>
          <Text style={[typography.b2, {fontWeight: 'bold'}]}>
            {currentRoute}
          </Text>
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
    paddingHorizontal: paddings.header.h,
    height: heights.header,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: zIndices.header,
    position: 'relative',
    backgroundColor: colors.white,
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

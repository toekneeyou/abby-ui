import {isDev} from '@services/helper';
import {
  FetchAccessTokenRequest,
  fetchAccessToken,
} from '@services/plaidService';
import {setError} from '@store/generalStore';
import {useAppDispatch, useAppSelector} from '@store/store';
import {getLinkToken, getUser} from '@store/userStore';
import {AxiosError} from 'axios';
import {
  LinkExit,
  LinkSuccess,
  PlaidLinkProps,
} from 'react-native-plaid-link-sdk';
import useSyncAccounts from './useSyncAccounts';

export default function usePlaidLink() {
  const dispatch = useAppDispatch();
  const linkToken = useAppSelector(getLinkToken);
  const user = useAppSelector(getUser);
  const syncEverything = useSyncAccounts();

  const handleSuccess = async (success: LinkSuccess) => {
    try {
      const request: FetchAccessTokenRequest = {
        userId: user?.id as number,
        publicToken: success.publicToken,
      };
      await fetchAccessToken(request);
      await syncEverything();
    } catch (error) {
      dispatch(setError(error as AxiosError));
    }
  };

  const handleExit = async (exit: LinkExit) => {
    if (isDev()) {
      console.log('exit', exit);
    }
  };

  if (linkToken) {
    const config: Partial<PlaidLinkProps> = {
      tokenConfig: {token: linkToken, noLoadingState: true},
      onSuccess: handleSuccess,
      onExit: handleExit,
    };
    return config;
  } else {
    return {};
  }
}

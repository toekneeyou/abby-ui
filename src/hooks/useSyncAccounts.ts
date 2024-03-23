import {useAppDispatch, useAppSelector} from '@store/store';
import {getUser} from '@store/userStore';
import {
  FetchInstitutionsRequest,
  FetchNetWorthsRequest,
  fetchInstitutions,
  fetchNetWorths,
  saveNetWorth,
} from '@services/databaseService';
import {FetchBalanceRequest, fetchBalance} from '@services/plaidService';
import {
  Account,
  Institution,
  setAccounts,
  setInstitutions,
  setNetWorths,
} from '@store/financialDataStore';
import {
  calculateNetWorth,
  netWorthSort,
  organizeAccountsResponseByCategory,
} from '@services/helper';

export default function useSyncAccounts() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const syncInstitutions = async () => {
    try {
      const fetchInstitutionsRequest: FetchInstitutionsRequest = {
        userId: user?.id as number,
      };
      const institutions = await fetchInstitutions(fetchInstitutionsRequest);
      dispatch(setInstitutions(institutions));
      return institutions;
    } catch (error) {
      console.error('syncInstitutions', error);
      throw error;
    }
  };

  const syncNetWorth = async (accounts: Account[][]) => {
    try {
      const netWorth = calculateNetWorth(accounts);
      const today = new Date();
      await saveNetWorth({
        amount: netWorth,
        userId: user?.id as number,
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
      });

      const fetchNetWorthsRequest: FetchNetWorthsRequest = {
        userId: user?.id as number,
      };
      const netWorths = await fetchNetWorths(fetchNetWorthsRequest);
      netWorths.sort(netWorthSort);
      dispatch(setNetWorths(netWorths));
      return netWorths;
    } catch (error) {
      console.error('syncNetWorth', error);
      throw error;
    }
  };

  const syncAccounts = async (institutions: Institution[]) => {
    try {
      const accountPromises = institutions.map(i => {
        const fetchBalanceRequest: FetchBalanceRequest = {
          accessToken: i.plaidAccessToken,
          userId: user?.id as number,
        };

        return fetchBalance(fetchBalanceRequest);
      });
      const accountsResponse = await Promise.all(accountPromises);
      const netWorths = await syncNetWorth(accountsResponse);
      const accounts = organizeAccountsResponseByCategory(accountsResponse);
      dispatch(setAccounts(accounts));
      return {accounts, netWorths};
    } catch (error) {
      console.error('syncAccounts', error);
      throw error;
    }
  };

  const syncEverything = async () => {
    try {
      const institutions = await syncInstitutions();
      const {accounts, netWorths} = await syncAccounts(institutions);
      return {institutions, accounts, netWorths};
    } catch (error) {
      console.error('syncEverything', error);
      throw error;
    }
  };

  return syncEverything;
}

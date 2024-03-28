import {useAppDispatch, useAppSelector} from '@store/store';
import {getUser} from '@store/userStore';
import {
  FetchInstitutionsRequest,
  FetchTrendsRequest,
  SaveTrendRequest,
  fetchInstitutions,
  fetchTrends,
  saveTrend,
} from '@services/databaseService';
import {FetchBalanceRequest, fetchBalance} from '@services/plaidService';
import {
  Account,
  Institution,
  setAccounts,
  setInstitutions,
} from '@store/financialDataStore';
import {
  organizeAccountsResponseByCategory,
  returnDateString,
  trendSort,
} from '@services/helper';
import {TrendCategories, setTrends} from '@store/trendsStore';
import {setIsSyncing} from '@store/generalStore';
import {normalizeTrendCategory} from '@services/normalizeData';

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

  const syncTrends = async (accounts: Account[][]) => {
    try {
      const today = returnDateString(new Date());
      const trendsObject: {[key in TrendCategories]?: number} = {};

      accounts.flat().forEach(a => {
        const category = normalizeTrendCategory(a.plaidType);
        if (category) {
          trendsObject[category] =
            (trendsObject[category] ?? 0) + a.plaidCurrentBalance;
        }
      });

      const trendsRequests = Object.entries(trendsObject).map(
        ([category, value]) => {
          const saveTrendRequest: SaveTrendRequest = {
            date: today,
            userId: user?.id as number,
            value: value,
            category: category as TrendCategories,
          };
          return saveTrendRequest;
        },
      );

      const trendsPromises = trendsRequests.map(t => {
        return saveTrend(t);
      });

      await Promise.all(trendsPromises);

      const fetchTrendsRequest: FetchTrendsRequest = {
        userId: user?.id as number,
      };
      const trends = await fetchTrends(fetchTrendsRequest);
      trends.sort(trendSort);
      dispatch(setTrends(trends));
      return trends;
    } catch (error) {
      console.error('syncTrends', error);
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
      const trends = await syncTrends(accountsResponse);
      const accounts = organizeAccountsResponseByCategory(accountsResponse);
      dispatch(setAccounts(accounts));
      return {accounts, trends};
    } catch (error) {
      console.error('syncAccounts', error);
      throw error;
    }
  };

  const syncEverything = async () => {
    try {
      dispatch(setIsSyncing(true));
      const institutions = await syncInstitutions();
      const {accounts, trends} = await syncAccounts(institutions);
      return {institutions, accounts, trends};
    } catch (error) {
      console.error('syncEverything', error);
      throw error;
    } finally {
      dispatch(setIsSyncing(false));
    }
  };

  return syncEverything;
}

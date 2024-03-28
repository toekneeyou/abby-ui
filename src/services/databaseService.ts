import axios from 'axios';

import {API_URL} from '@env';
import {Account, Institution} from '@store/financialDataStore';
import {isDev} from './helper';
import {Trend, TrendCategories} from '@store/trendsStore';

export type FetchInstitutionsRequest = {
  userId: number;
};
/**
 * Get all institutions belonging to the user.
 */
export const fetchInstitutions: ({
  userId,
}: FetchInstitutionsRequest) => Promise<
  Institution[]
> = async getInstitutionsRequest => {
  if (isDev()) {
    console.log(`${API_URL}/api/v1/institutions/all`);
  }

  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/api/v1/institutions/all`,
      data: getInstitutionsRequest,
    });
    return response.data;
  } catch (error) {
    console.error('fetchInstitutions', error);
    throw error;
  }
};

export type FetchAccountsRequest = {
  plaidItemId: string;
};
/**
 * Get all accounts belonging to a user's institution.
 */
export const fetchAccounts: (
  fetchAccountsRequest: FetchAccountsRequest,
) => Promise<Account[]> = async fetchAccountsRequest => {
  if (isDev()) {
    console.log(`${API_URL}/api/v1/accounts/all`);
  }

  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/api/v1/accounts/all`,
      data: fetchAccountsRequest,
    });
    return response.data;
  } catch (error) {
    console.error('fetchAccounts', error);
    throw error;
  }
};

export type SaveTrendRequest = {
  value: number;
  category: TrendCategories;
  userId: number;
  date: string;
};
export const saveTrend: (
  saveTrendRequest: SaveTrendRequest,
) => Promise<Trend> = async saveTrendRequest => {
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/api/v1/trends/save`,
      data: saveTrendRequest,
    });
    return response.data;
  } catch (error) {
    console.error('saveTrend', error);
    throw error;
  }
};

export type FetchTrendsRequest = {
  userId: number;
};
export const fetchTrends: (
  fetchTrendsRequest: FetchTrendsRequest,
) => Promise<Trend[]> = async fetchTrendsRequest => {
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/api/v1/trends/all`,
      data: fetchTrendsRequest,
    });
    return response.data;
  } catch (error) {
    console.error('fetchTrends', error);
    throw error;
  }
};

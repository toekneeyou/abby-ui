import axios from 'axios';

import {API_URL} from '@env';
import {Account, Institution, NetWorth} from '@store/financialDataStore';
import {isDev} from './helper';

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

export type SaveNetWorthRequest = {
  amount: number;
  month: number;
  day: number;
  year: number;
  userId: number;
};
export const saveNetWorth: (
  fetchNetWorthsRequest: SaveNetWorthRequest,
) => Promise<NetWorth> = async fetchNetWorthsRequest => {
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/api/v1/netWorth/save`,
      data: fetchNetWorthsRequest,
    });
    return response.data;
  } catch (error) {
    console.error('saveNetWorth', error);
    throw error;
  }
};

export type FetchNetWorthsRequest = {
  userId: number;
};
export const fetchNetWorths: (
  fetchNetWorthsRequest: FetchNetWorthsRequest,
) => Promise<NetWorth[]> = async fetchNetWorthsRequest => {
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/api/v1/netWorth/all`,
      data: fetchNetWorthsRequest,
    });
    return response.data;
  } catch (error) {
    console.error('fetchNetWorths', error);
    throw error;
  }
};

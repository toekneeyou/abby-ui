import {API_URL} from '@env';
import axios from 'axios';

import {User} from '@store/userStore';
import {isDev} from './helper';
import {Account, Institution} from '@store/financialDataStore';

export type CreateLinkTokenRequest = {
  userId: string;
};
/**
 * Creates a link token that can be used to retreive a public token from Plaid.
 */
export const createLinkToken: (
  userId: number,
) => Promise<string> = async userId => {
  if (isDev()) {
    console.log(`${API_URL}/api/v1/plaid/linkToken`);
  }
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/api/v1/plaid/linkToken`,
      data: {userId},
    });

    return response.data.link_token;
  } catch (error) {
    console.error('createLinkToken', error);
    throw error;
  }
};

export type FetchAccessTokenRequest = {
  userId: number;
  publicToken: string;
};
/**
 * Exchanges public token for an access token from Plaid and returns the updated user.
 */
export const fetchAccessToken: (
  getAccessTokenRequest: FetchAccessTokenRequest,
) => Promise<Institution> = async getAccessTokenRequest => {
  if (isDev()) {
    console.log(`${API_URL}/api/v1/plaid/accessToken`);
  }

  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/api/v1/plaid/accessToken`,
      data: getAccessTokenRequest,
    });
    return response.data;
  } catch (error) {
    console.error('fetchAccessToken', error);
    throw error;
  }
};

export type FetchBalanceRequest = {
  userId: number;
  accessToken: string;
};
/**
 * Gets balances for all accounts belonging to the instutition the
 * access token is associated with and returns the updated user.
 */
export const fetchBalance: ({
  accessToken,
  userId,
}: FetchBalanceRequest) => Promise<Account[]> = async getBalanceRequest => {
  if (isDev()) {
    console.log(`${API_URL}/api/v1/plaid/balance`);
  }

  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/api/v1/plaid/balance`,
      data: getBalanceRequest,
    });
    return response.data;
  } catch (error) {
    console.error('fetchBalance', error);
    throw error;
  }
};

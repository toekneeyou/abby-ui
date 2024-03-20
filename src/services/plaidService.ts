import {API_URL} from '@env';
import axios from 'axios';

import {User} from '@store/userStore';
import {isDev} from './helper';

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
    console.log(`${API_URL}/api/v1/plaid/createLinkToken`);
  }
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/api/v1/plaid/createLinkToken`,
      data: {userId},
    });

    return response.data.link_token;
  } catch (error) {
    console.error('createLinkToken', error);
    throw error;
  }
};

export type FetchAccessTokenRequest = {
  userId: string;
  publicToken: string;
};
/**
 * Exchanges public token for an access token from Plaid and returns the updated user.
 */
export const fetchAccessToken: (
  getAccessTokenRequest: FetchAccessTokenRequest,
) => Promise<User> = async getAccessTokenRequest => {
  if (isDev()) {
    console.log(`${API_URL}/api/v1/plaid/fetchAccessToken`);
  }

  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/api/v1/plaid/fetchAccessToken`,
      data: getAccessTokenRequest,
    });
    return response.data;
  } catch (error) {
    console.error('fetchAccessToken', error);
    throw error;
  }
};

export type FetchBalanceRequest = {
  userId: string;
  accessToken: string;
};
/**
 * Gets balances for all accounts belonging to the instutition the
 * access token is associated with and returns the updated user.
 */
export const fetchBalance: ({
  accessToken,
  userId,
}: FetchBalanceRequest) => Promise<User> = async getBalanceRequest => {
  if (isDev()) {
    console.log(`${API_URL}/api/v1/plaid/fetchBalance`);
  }

  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/api/v1/plaid/fetchBalance`,
      data: getBalanceRequest,
    });
    return response.data;
  } catch (error) {
    console.error('fetchBalance', error);
    throw error;
  }
};

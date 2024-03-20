import axios from 'axios';

import {API_URL} from '@env';
import {User} from '@store/userStore';
import {isDev} from './helper';

export type LoginRequest = Pick<User, 'username' | 'password'>;
/**
 * Logs user in.
 */
export const login: (
  loginRequest: LoginRequest,
) => Promise<User> = async loginRequest => {
  if (isDev()) {
    console.log(`${API_URL}/api/v1/auth/login`);
  }

  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/api/v1/auth/login`,
      data: loginRequest,
    });

    return response.data;
  } catch (error) {
    console.error('login', error);
    throw error;
  }
};

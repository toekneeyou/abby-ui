import {API_URL} from '@env';
import axios from 'axios';

import {User} from '../types/user';

export const login = async ({username, password}: User) => {
  console.log(`${API_URL}/api/v1/auth/login`);

  return await axios({
    method: 'post',
    url: `${API_URL}/api/v1/auth/login`,
    data: {username, password},
  });
};

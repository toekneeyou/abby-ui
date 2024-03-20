import {Account, AccountsState} from '@store/financialDataStore';

export const isDev = () => {
  return process.env.NODE_ENV === 'development';
};

export const organizeAccountsResponseByCategory = (accounts: Account[][]) => {
  const organizedAcounts: AccountsState = {};
  accounts.flat().forEach(account => {
    if (organizedAcounts[account.plaidType]) {
      organizedAcounts[account.plaidType]?.push(account);
    } else {
      organizedAcounts[account.plaidType] = [account];
    }
  });
  return organizedAcounts;
};

export const returnCurrency = (decimal: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(decimal);
};

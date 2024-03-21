import {Account, AccountsState, NetWorth} from '@store/financialDataStore';

/**
 * Indicates whether the environment is "development" or not.
 */
export const isDev = () => {
  return process.env.NODE_ENV === 'development';
};

/**
 * Creates an object and categories accounts by category.
 */
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

/**
 * Transforms a decimal into a currency string.
 */
export const returnCurrency = (decimal: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(decimal);
};

/**
 * Calculates net worth.
 */
export const calculateNetWorth = (accounts: Account[][]) => {
  let netWorth = 0;
  accounts.flat().forEach(account => {
    const type = account.plaidType;
    if (type === 'depository' || type === 'investment') {
      netWorth += account.plaidCurrentBalance;
    } else if (type === 'credit' || type === 'loan') {
      netWorth -= account.plaidCurrentBalance;
    }
  });
  return netWorth;
};

/**
 * Sorts net worth by date from oldest to newest.
 */
export const netWorthSort = (a: NetWorth, b: NetWorth) => {
  const dateA = new Date(a.year, a.month, a.day);
  const dateB = new Date(b.year, b.month, b.day);
  // @ts-ignore
  return dateA - dateB;
};

/**
 *
 */

import {Account} from '@store/financialDataStore';
import {Trend, TrendCategories} from '@store/trendsStore';

export const normalizeTrends = (trends: Trend[]) => {
  return trends.map(t => {
    t.value = Number(t.value);
    return t;
  });
};

export const normalizeAccounts = (accounts: Account[]) => {
  return accounts.map(a => {
    a.plaidAvailableBalance = Number(a.plaidAvailableBalance);
    a.plaidCurrentBalance = Number(a.plaidCurrentBalance);
    a.plaidCreditLimit = Number(a.plaidCreditLimit);
    return a;
  });
};

export const normalizeTrendCategory: (
  t: string,
) => TrendCategories | null = t => {
  switch (t) {
    case 'depository':
      return TrendCategories.cash;
    case 'credit':
      return TrendCategories.creditCards;
    case 'investment':
      return TrendCategories.investments;
    case 'loan':
      return TrendCategories.loans;
    default:
      return null;
  }
};

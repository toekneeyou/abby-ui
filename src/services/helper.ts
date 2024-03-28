import {Account, AccountsState} from '@store/financialDataStore';
import {Trend, TrendCategories} from '@store/trendsStore';

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
export const trendSort = (a: Trend, b: Trend) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  // @ts-ignore
  return dateA - dateB;
};

export const filterTrends = (
  trendCategory: TrendCategories,
  trends: Trend[],
) => {
  let filteredData = [];
  switch (trendCategory) {
    case TrendCategories.cash:
      filteredData = trends.filter(t => {
        return t.category === TrendCategories.cash;
      });
      break;
    case TrendCategories.creditCards:
      filteredData = trends.filter(t => {
        return t.category === TrendCategories.creditCards;
      });
      break;
    case TrendCategories.investments:
      filteredData = trends.filter(t => {
        return t.category === TrendCategories.investments;
      });
      break;
    case TrendCategories.loans:
      filteredData = trends.filter(t => {
        return t.category === TrendCategories.loans;
      });
      break;
    case TrendCategories.totalDebt:
      const datedDebt: {[date: string]: number} = {};
      trends.forEach(t => {
        if (
          t.category === TrendCategories.creditCards ||
          t.category === TrendCategories.loans
        ) {
          if (typeof datedDebt[t.date] === 'number') {
            datedDebt[t.date] = datedDebt[t.date] + Number(t.value);
          } else {
            datedDebt[t.date] = Number(t.value);
          }
        }
      });
      filteredData = Object.entries(datedDebt).map(([date, value]) => {
        return {
          category: TrendCategories.totalDebt,
          date,
          value,
        };
      });

      break;
    // default TrendCategories.netWorth
    case TrendCategories.netWorth:
      const datedNetWorth: {[date: string]: number} = {};
      trends.forEach(t => {
        if (
          t.category === TrendCategories.cash ||
          t.category === TrendCategories.investments
        ) {
          if (typeof datedNetWorth[t.date] === 'number') {
            datedNetWorth[t.date] = datedNetWorth[t.date] + Number(t.value);
          }
        }

        if (
          t.category === TrendCategories.creditCards ||
          t.category === TrendCategories.loans
        ) {
          if (typeof datedNetWorth[t.date] === 'number') {
            datedNetWorth[t.date] = datedNetWorth[t.date] - Number(t.value);
          } else {
            datedNetWorth[t.date] = -Number(t.value);
          }
        }
      });
      filteredData = Object.entries(datedNetWorth).map(([date, value]) => {
        return {
          category: TrendCategories.netWorth,
          date,
          value,
        } as Trend;
      });

      break;
    default:
      filteredData = [...trends];
  }

  return filteredData;
};

export const returnDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

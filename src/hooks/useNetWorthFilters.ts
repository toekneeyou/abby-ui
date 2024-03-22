import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {NetWorth} from '@store/financialDataStore';
import {ChartData} from '@features/NetWorthChart';

export type NetWorthWithValue = NetWorth & {value: number};
export type NetWorthFilterOption = '1w' | '1m' | '1y' | 'YTD' | 'Max';
export const netWorthChartFilters: NetWorthFilterOption[] = [
  '1w',
  '1m',
  '1y',
  'YTD',
  'Max',
];

export const useNetWorthFilters: (netWorths: NetWorth[]) => {
  filteredData: ChartData<NetWorthWithValue>[];
  filter: NetWorthFilterOption;
  setFilter: Dispatch<SetStateAction<NetWorthFilterOption>>;
} = (netWorths: NetWorth[]) => {
  const [filter, setFilter] = useState(netWorthChartFilters[0]);
  const [filteredData, setFilteredData] = useState<
    ChartData<NetWorthWithValue>[]
  >([]);

  useEffect(() => {
    const todaysDate = new Date(new Date().setHours(0, 0, 0, 0));
    const thisMonth = todaysDate.getMonth();
    const thisYear = todaysDate.getFullYear();
    const thisDay = todaysDate.getDate();

    let newFilteredData: NetWorth[] = [...netWorths];
    switch (filter) {
      case '1w':
        const oneWeekAgo = new Date(
          todaysDate.getTime() - 7 * 24 * 60 * 60 * 1000,
        );
        newFilteredData = netWorths.filter(nw => {
          const date = new Date(nw.year, nw.month, nw.day);
          return date > oneWeekAgo;
        });
        break;
      case '1m':
        const oneMonthAgo = new Date(
          thisMonth === 0 ? thisYear - 1 : thisYear,
          thisMonth === 0 ? 11 : thisMonth - 1,
          thisDay,
        );
        newFilteredData = netWorths.filter(nw => {
          const date = new Date(nw.year, nw.month, nw.day);
          return date > oneMonthAgo;
        });
        break;
      case '1y':
        const oneYearAgoToday = new Date(thisYear - 1, thisMonth, thisDay);
        newFilteredData = netWorths.filter(nw => {
          const date = new Date(nw.year, nw.month, nw.day);
          return date > oneYearAgoToday;
        });
        break;
      case 'YTD':
        newFilteredData = netWorths.filter(nw => nw.year === thisYear);
        break;
      case 'Max':
      default:
    }

    const filteredDataWithValue = newFilteredData.map(nw => {
      return {...nw, value: +nw.amount} as NetWorthWithValue;
    });

    setFilteredData(filteredDataWithValue);
  }, [netWorths, filter]);

  return {filteredData, filter, setFilter};
};

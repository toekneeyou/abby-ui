import {filterTrends} from '@services/helper';
import {setError} from '@store/generalStore';
import {useAppDispatch, useAppSelector} from '@store/store';
import {Trend, getSelectedTrendCategory, getTrends} from '@store/trendsStore';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';

export type TrendChartFilterOption = '1w' | '1m' | '1y' | 'YTD' | 'Max';
export const trendChartFilters: TrendChartFilterOption[] = [
  '1w',
  '1m',
  '1y',
  'YTD',
  'Max',
];

const useTrendFilters: () => {
  filteredData: Trend[];
  filter: TrendChartFilterOption;
  setFilter: Dispatch<SetStateAction<TrendChartFilterOption>>;
} = () => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState(trendChartFilters[0]);
  const [filteredData, setFilteredData] = useState<Trend[]>([]);
  const trends = useAppSelector(getTrends);
  const selectedTrendCategory = useAppSelector(getSelectedTrendCategory);

  useEffect(() => {
    const todaysDate = new Date(new Date().setHours(0, 0, 0, 0));
    const thisMonth = todaysDate.getUTCMonth();
    const thisYear = todaysDate.getUTCFullYear();
    const thisDay = todaysDate.getUTCDate();

    let newFilteredData: Trend[];

    if (selectedTrendCategory) {
      // filter by trend category first
      newFilteredData = filterTrends(selectedTrendCategory, trends);
      // filter by selected filter
      switch (filter) {
        case '1w':
          const oneWeekAgo = new Date(
            todaysDate.getTime() - 7 * 24 * 60 * 60 * 1000,
          );
          newFilteredData = newFilteredData.filter(t => {
            const date = new Date(t.date);
            return date > oneWeekAgo;
          });
          break;
        case '1m':
          const oneMonthAgo = new Date(
            thisMonth === 0 ? thisYear - 1 : thisYear,
            thisMonth === 0 ? 11 : thisMonth - 1,
            thisDay,
          );
          newFilteredData = newFilteredData.filter(t => {
            const date = new Date(t.date);
            return date > oneMonthAgo;
          });
          break;
        case '1y':
          const oneYearAgoToday = new Date(thisYear - 1, thisMonth, thisDay);
          newFilteredData = newFilteredData.filter(t => {
            const date = new Date(t.date);
            return date > oneYearAgoToday;
          });
          break;
        case 'YTD':
          newFilteredData = newFilteredData.filter(
            t => new Date(t.date).getFullYear() === thisYear,
          );
          break;
        case 'Max':
        default:
      }

      setFilteredData(newFilteredData);
    } else {
      dispatch(setError(new Error('No category selected.')));
    }
  }, [trends, filter, selectedTrendCategory]);

  return {filteredData, filter, setFilter};
};

export default useTrendFilters;

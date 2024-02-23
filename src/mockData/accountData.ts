import {
  faArrowTrendUp,
  faCreditCard,
  faSackDollar,
} from '@fortawesome/free-solid-svg-icons';

export const accountData = [
  {
    category: 'Cash',
    icon: faSackDollar,
    value: '$1,234.53',
    accounts: [
      {
        name: 'SoFi',
        type: 'Checking',
        value: '$100.23',
        syncTime: '1 minute ago',
      },
      {
        name: 'SoFi',
        type: 'Savings',
        value: '$1,200.55',
        syncTime: '1 minute ago',
      },
      {
        name: 'Chase',
        type: 'Checking',
        value: '$1,211.41',
        syncTime: '2 minutes ago',
      },
      {
        name: 'Ally',
        type: 'Checking',
        value: '$1.89',
        syncTime: '3 minutes ago',
      },
    ],
  },
  {
    category: 'Investments',
    icon: faArrowTrendUp,
    value: '$3,212.00',
    accounts: [
      {
        name: 'RobinHood',
        type: 'Brokerage',
        value: '$100.23',
        syncTime: '1 minute ago',
      },
      {
        name: 'SoFi',
        type: 'Brokerage',
        value: '$1,200.55',
        syncTime: '1 minute ago',
      },
      {
        name: 'WeBull',
        type: 'Brokerage',
        value: '$1,200.55',
        syncTime: '1 minute ago',
      },
      {
        name: 'Fidelity',
        type: 'Brokerage',
        value: '$1,200.55',
        syncTime: '1 minute ago',
      },
    ],
  },
  {
    category: 'Credit Cards',
    icon: faCreditCard,
    value: '$56,231.90',
    accounts: [
      {
        name: 'SoFi',
        type: 'Credit Card',
        value: '$100.23',
        syncTime: '1 minute ago',
      },
      {
        name: 'Citi',
        type: 'Credit Card',
        value: '$1,200.55',
        syncTime: '1 minute ago',
      },
      {
        name: 'Chase',
        type: 'Credit Card',
        value: '$1,211.41',
        syncTime: '2 minutes ago',
      },
      {
        name: 'Wells Fargo',
        type: 'Credit Card',
        value: '$1.89',
        syncTime: '3 minutes ago',
      },
    ],
  },
];

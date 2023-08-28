import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TransactionTable from './Transaction';
import { TableContext } from '../../organisms/Transaction';

jest.mock('../../../lib/Fetcher', () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return {
        data: [
          {
            status: 'pending',
            voucher: {
              patientId: '1',
              currency: 'EUR',
              amount: 100,
            },
            createdAt: '2021-09-28T14:00:00.000Z',
          },
        ],
        isLoading: false,
        isError: false,
      };
    }),
  };
});

describe('Transaction Table', () => {
  it.todo('renders Transaction Table component');
});

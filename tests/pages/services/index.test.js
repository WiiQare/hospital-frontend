import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import DashboardLayout from '../../../layouts/Dashboard';
import Page from '../../../pages/services';
import { store } from '../../../redux/store';
require('jest-fetch-mock').enableMocks();

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      'payment-intent': 'pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z',
    },
  }),
}));

fetch.mockResponse(JSON.stringify([]));

describe('Services Page', () => {
  it('renders', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <SessionProvider
          session={{ user: { email: '', data: { providerId: '' } } }}
        >
          <Provider store={store}>
            <Page />
          </Provider>
        </SessionProvider>
      </QueryClientProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should have DashboardLayout', () => {
    expect(Page.getLayout(<div />)).toEqual(
      <DashboardLayout className="space-y-8">
        <div />
      </DashboardLayout>,
    );
  });
});

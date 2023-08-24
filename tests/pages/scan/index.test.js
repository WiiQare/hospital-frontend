import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Page from '../../../pages/scan';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import { QueryClientProvider, QueryClient } from 'react-query';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      'payment-intent': 'pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z',
    },
  }),
}));

describe('Scan Page', () => {
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
});

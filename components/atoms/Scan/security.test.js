import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Security from './security';
import { StepContext } from '.';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider, QueryClient } from 'react-query';

describe('Security', () => {
  let component;
  beforeEach(() => {
    const queryClient = new QueryClient();
    const res = render(
      <SessionProvider
        session={{
          user: {
            data: {
              access_token: 'token123',
              providerId: 'id123',
            },
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <StepContext.Provider value={{ step: 1, setStep: () => {} }}>
            <Security shorten={true} />
          </StepContext.Provider>
        </QueryClientProvider>
      </SessionProvider>,
    );
    component = res.container;
  });

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});

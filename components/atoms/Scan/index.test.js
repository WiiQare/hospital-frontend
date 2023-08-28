import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Scan from '.';
import { SessionProvider } from 'next-auth/react';

describe('Scan', () => {
  let component;
  beforeEach(() => {
    const res = render(
      <SessionProvider
        session={{
          user: { name: 'John Doe', data: { providerId: 'test123' } },
        }}
      >
        <Scan />
      </SessionProvider>,
    );
    component = res.container;
  });

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });

  test('should render text elements', () => {
    expect(screen.getByText('Définir comme traitement')).toBeInTheDocument();
  });
});

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import DashboardLayout from '../../../layouts/dashboard';
import Page from '../../../pages/wallet';

describe('Wallet Page', () => {
  it('renders', () => {
    const { container } = render(<Page />);
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

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DashboardLayout from '../../layouts/dashboard';
import InvoicesPage from '../../pages/invoices';

describe('Invoices Page', () => {
  it('renders Invoices page', () => {
    render(<InvoicesPage />);
    expect(screen.getByText('Invoices')).toBeInTheDocument();
  });

  it('should have DashboardLayout', () => {
    expect(InvoicesPage.getLayout(<div />)).toEqual(
      <DashboardLayout className="space-y-8">
        <div />
      </DashboardLayout>,
    );
  });
});

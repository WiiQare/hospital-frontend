import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import InvoicesPage from '../../pages/invoices';

describe('Invoices Page', () => {
  it('renders Invoices page', () => {
    render(<InvoicesPage />);
    expect(screen.getByText('Invoices')).toBeInTheDocument();
  });
});

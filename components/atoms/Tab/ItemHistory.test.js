import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ItemHistory from './ItemHistory';

describe('Item History', () => {
  it('renders Item History component', () => {
    render(
      <ItemHistory
        fullname={'John Doe'}
        email={'john@example.com'}
        createdAt={new Date('2023-02-01')}
      />,
    );
    expect(screen.getByText('View Details')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});

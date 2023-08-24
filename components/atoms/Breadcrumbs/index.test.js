import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Breadcrumbs from '.';

describe('Breadcrumbs', () => {
  it('renders correctly', () => {
    const items = [];
    const component = render(<Breadcrumbs items={items} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with items', () => {
    const items = [
      { item: 'Home', link: '/' },
      { item: 'Products', link: '/products' },
      { item: '1', link: '/products/1' },
    ];
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});

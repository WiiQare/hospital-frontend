import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Filter from './Filter';

describe('Filter', () => {
  let component;
  const label = 'Filter';
  beforeEach(() => {
    const res = render(<Filter label={label} />);
    component = res.container;
  });

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });

  test('should render text elements', () => {
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Stat from '.';

describe('Stat', () => {
  let component;
  beforeEach(() => {
    const res = render(<Stat />);
    component = res.container;
  });

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });

  test('should render text elements', () => {
    expect(screen.getByText('Avg. Visit Per Days')).toBeInTheDocument();
  });
});

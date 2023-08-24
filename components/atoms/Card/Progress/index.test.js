import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Progress from '.';

describe('Progress', () => {
  const value = 50;
  let component;
  beforeEach(() => {
    const res = render(<Progress value={value} />);
    component = res.container;
  });

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render the value', () => {
    expect(screen.getByText(`${value}%`)).toBeInTheDocument();
  });
});

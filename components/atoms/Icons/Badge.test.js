import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge', () => {
  let component;
  const total = 10;
  beforeEach(() => {
    const res = render(
      <Badge total={total}>
        <div>test</div>
      </Badge>,
    );
    component = res.container;
  });

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });

  test('should render text elements', () => {
    expect(screen.getByText(total)).toBeInTheDocument();
  });
});

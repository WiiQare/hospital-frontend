import Page from './index';
import { render } from '@testing-library/react';

describe('LogoHeader', () => {
  it('renders correctly', () => {
    const { container } = render(<Page />);
    expect(container).toMatchSnapshot();
  });
});

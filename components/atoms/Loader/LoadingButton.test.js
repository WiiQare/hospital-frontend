import LoadingButton from './LoadingButton';
import { render } from '@testing-library/react';

describe('LoadingButton', () => {
  it('renders', () => {
    const { container } = render(<LoadingButton />);
    expect(container).toMatchSnapshot();
  });
});

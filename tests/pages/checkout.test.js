import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Page from '../../pages/checkout';
require('jest-fetch-mock').enableMocks();

fetch.mockResponse(JSON.stringify({ clientSecret: 'test' }));

describe('Checkout Page', () => {
  it('renders', () => {
    const { container } = render(<Page />);
    expect(container).toMatchSnapshot();
  });
});

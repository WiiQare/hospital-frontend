import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RangeSlider from './RangeSlider';

describe('RangeSlider', () => {
  let component;
  beforeEach(() => {
    const res = render(
      <RangeSlider
        initialMax={100}
        initialMin={10}
        min={0}
        max={1000}
        step={1}
        priceCap={100}
      />,
    );
    component = res.container;
  });

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});

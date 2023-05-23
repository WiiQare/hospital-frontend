import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SimpleHeader from "./simple";

describe("SimpleHeader", () => {
  let component;
  beforeEach(() => {
    const res = render(<SimpleHeader />);
    component = res.container;
  });

  it("should render the component", () => {
    expect(component).toMatchSnapshot();
  });
});

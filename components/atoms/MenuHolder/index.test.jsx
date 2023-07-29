import Page from "./index";
import { render } from "@testing-library/react";

describe("MenuHolder", () => {
  it("renders correctly", () => {
    const { container } = render(<Page href="test" label="Example" />);
    expect(container).toMatchSnapshot();
  });
});

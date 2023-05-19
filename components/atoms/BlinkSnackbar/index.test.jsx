import { render } from "@testing-library/react";
import BlinkSnackbar from ".";

describe("BlinkSnackbar", () => {
  it("should render", () => {
    const { container } = render(<BlinkSnackbar />);
    expect(container).toMatchSnapshot();
  });
});

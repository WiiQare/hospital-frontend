import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NoAction from "./NoAction";

describe("NoAction", () => {
  const text = "Sample text";
  it("renders correctly", () => {
    const component = render(<NoAction color="red" text={text} />);
    expect(component).toMatchSnapshot();
  });

  it("renders the button", () => {
    render(<NoAction color="red" text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});

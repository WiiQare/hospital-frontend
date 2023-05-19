import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Toast from ".";

describe("Toast", () => {
  const message = "Sample text";
  it("renders correctly", () => {
    const component = render(<Toast message={message} type={"success"} />);
    expect(component).toMatchSnapshot();
  });

  it("renders the button", () => {
    render(<Toast message={message} type={"success"} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});

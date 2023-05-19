import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Earn from "./Earn";

describe("Earn", () => {
  const title = "Sample title";
  it("renders correctly", () => {
    const component = render(<Earn modal={title} />);
    expect(component).toMatchSnapshot();
  });

  it("renders the button", () => {
    render(<Earn modal={title} />);
    expect(screen.getByText("Earn Budges for 10$")).toBeInTheDocument();
  });
});

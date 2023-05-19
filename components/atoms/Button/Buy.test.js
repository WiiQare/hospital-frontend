import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ButtonBuy from "./Buy";

describe("ButtonBuy", () => {
  it("renders correctly", () => {
    const component = render(<ButtonBuy title={"Buy"} />);
    expect(component).toMatchSnapshot();
  });

  it("renders with title", () => {
    render(<ButtonBuy title="Buy" />);
    expect(screen.getByText("Buy")).toBeInTheDocument();
  });
});

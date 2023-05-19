import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CardHeader from ".";

describe("CardHeader", () => {
  const title = "Sample title";
  it("renders correctly", () => {
    const component = render(<CardHeader title={title} />);
    expect(component).toMatchSnapshot();
  });

  it("renders the title", () => {
    render(<CardHeader title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});

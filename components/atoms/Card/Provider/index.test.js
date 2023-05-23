import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CardProvider from ".";

describe("CardProvider", () => {
  let component;
  beforeEach(() => {
    const res = render(<CardProvider />);
    component = res.container;
  });

  it("should render the component", () => {
    expect(component).toMatchSnapshot();
  });

  test("should render text elements", () => {
    expect(screen.getByText("Learn more")).toBeInTheDocument();
    expect(screen.getByText("Enroll now")).toBeInTheDocument();
  });
});

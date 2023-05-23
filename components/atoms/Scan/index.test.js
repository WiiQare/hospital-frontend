import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Scan from ".";

describe("Scan", () => {
  let component;
  beforeEach(() => {
    const res = render(<Scan />);
    component = res.container;
  });

  it("should render the component", () => {
    expect(component).toMatchSnapshot();
  });

  test("should render text elements", () => {
    expect(
      screen.getByText("Accorder la demande d'allumer la caméra")
    ).toBeInTheDocument();
  });
});

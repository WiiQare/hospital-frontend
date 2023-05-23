import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge", () => {
  const title = "Title";
  const time = "Time";
  const avatar = "/Avatar.png";
  let component;

  beforeEach(() => {
    const res = render(<Badge title={title} time={time} avatar={avatar} />);
    component = res.container;
  });

  it("should render the component", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render the title", () => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("should render the time", () => {
    expect(screen.getByText(time)).toBeInTheDocument();
  });
});

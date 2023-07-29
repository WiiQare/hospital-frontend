import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Page from "../../../pages/wallet";

describe("Wallet Page", () => {
  it("renders", () => {
    const { container } = render(<Page />);
    expect(container).toMatchSnapshot();
  });
});

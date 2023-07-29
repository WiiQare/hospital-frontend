import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Login from "../../pages/login";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      "payment-intent": "pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z",
    },
  }),
}));

describe("Login Page", () => {
  it("renders", () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });
});

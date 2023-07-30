import { Provider } from "react-redux";
import { FormContextRegister } from "../RegisterForm";
import Information from "./informations";
import { render } from "@testing-library/react";
import { store } from "../../../../redux/store";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      "payment-intent": "pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z",
    },
  }),
}));

describe("Information", () => {
  it("should render successfully", () => {
    const { container } = render(
      <Provider store={store}>
        <FormContextRegister.Provider value={{}}>
          <Information />
        </FormContextRegister.Provider>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});

import Componenet from "./personalInformations";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { FormContextRegister } from "../RegisterForm";
import { store } from "../../../../redux/store";
import { QueryClientProvider, QueryClient } from "react-query";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      "payment-intent": "pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z",
    },
  }),
}));

describe("Page Information", () => {
  it("should render successfully", () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <FormContextRegister.Provider value={{}}>
            <Componenet />
          </FormContextRegister.Provider>
        </Provider>
      </QueryClientProvider>
    );
    expect(container).toMatchSnapshot();
  });
});

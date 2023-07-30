import { Provider } from "react-redux";
import { FormContextRegister } from "../RegisterForm";
import OTP from "./otp";
import { render } from "@testing-library/react";
import { store } from "../../../../redux/store";
import { QueryClientProvider, QueryClient } from "react-query";

describe("OTP", () => {
  it("should render successfully", () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <FormContextRegister.Provider value={{}}>
            <OTP />
          </FormContextRegister.Provider>
        </Provider>
      </QueryClientProvider>
    );
    expect(container).toMatchSnapshot();
  });
});

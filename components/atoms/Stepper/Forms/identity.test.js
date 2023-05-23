import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Identity from "./identity";
import { FormContext } from "../../../../pages/voucher/buy";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../../../../redux/store";
import { QueryClientProvider, QueryClient } from "react-query";

describe("Identity", () => {
  let component;
  beforeEach(() => {
    const queryClient = new QueryClient();
    const res = render(
      <SessionProvider session={{ user: { data: { userId: "random123" } } }}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <FormContext.Provider value={{ activeStepIndex: 0 }}>
              <Identity />
            </FormContext.Provider>
          </Provider>
        </QueryClientProvider>
      </SessionProvider>
    );
    component = res.container;
  });

  it("should render the component", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render text", () => {
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
  });
});

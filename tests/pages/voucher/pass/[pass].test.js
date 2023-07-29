import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Page from "../../../../pages/voucher/pass/[pass]";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../../../../redux/store";
import { QueryClientProvider, QueryClient } from "react-query";

describe("Voucher pass Page", () => {
  it("renders", () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={{ user: { email: "" } }}>
          <Provider store={store}>
            <Page />
          </Provider>
        </SessionProvider>
      </QueryClientProvider>
    );
    expect(container).toMatchSnapshot();
  });
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Send from "./send";
import { FormContext } from "../../../../pages/voucher/buy";

describe("Send", () => {
  let component;
  beforeEach(() => {
    const res = render(
      <FormContext.Provider value={{ activeStepIndex: 0 }}>
        <Send />
      </FormContext.Provider>
    );
    component = res.container;
  });

  it("should render the component", () => {
    expect(component).toMatchSnapshot();
  });
});

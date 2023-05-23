import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Stepper from ".";
import { FormContext } from "../../../pages/voucher/buy";

describe("Stepper", () => {
  let component;
  beforeEach(() => {
    const res = render(
      <FormContext.Provider value={{ activeStepIndex: 0 }}>
        <Stepper />
      </FormContext.Provider>
    );
    component = res.container;
  });

  it("should render the component", () => {
    expect(component).toMatchSnapshot();
  });
});

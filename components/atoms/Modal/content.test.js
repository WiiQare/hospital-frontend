import Page from "./content";
import { render } from "@testing-library/react";
import { Transition, Dialog } from "@headlessui/react";

describe("Modal Content", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Transition show>
        <Dialog onClose={() => {}}>
          <Page />
        </Dialog>
      </Transition>
    );
    expect(container).toMatchSnapshot();
  });
});

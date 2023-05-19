import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TransactionTable from "./Transaction";

describe("Transaction Table", () => {
  it("renders Transaction Table component", () => {
    render(<TransactionTable />);
    expect(screen.getByText("Name")).toBeInTheDocument();
  });
});

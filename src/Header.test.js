import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Page Tests", () => {
  test("renders eventBrite", () => {
    render(<Header />);
    const linkElement = screen.getByText(/eventBrite/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders button", () => {
    render(<Header />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

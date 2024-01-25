import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

describe("Home Page Tests", () => {
  test("renders Browsing events", () => {
    render(<HomePage />);
    const linkElement = screen.getByText(/Browsing events/i);
    expect(linkElement).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./components/Button.jsx";
import { Card } from "./components/Card.jsx";
import { TextField } from "./components/TextField.jsx";

describe("@enerlumea/ui", () => {
  it("renders a button with safe default type and forwards events", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("supports semantic card elements and accessible labels", () => {
    render(
      <Card as="section" aria-label="Preferences">
        Preferences content
      </Card>,
    );

    expect(screen.getByRole("region", { name: "Preferences" })).toHaveTextContent(
      "Preferences content",
    );
  });

  it("connects field labels, hints, and validation errors to the input", () => {
    render(
      <TextField
        label="Email address"
        name="email"
        type="email"
        hint="Use your work email."
        error="Enter a valid email address."
      />,
    );

    const input = screen.getByRole("textbox", { name: "Email address" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription(
      "Use your work email. Enter a valid email address.",
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Enter a valid email address.",
    );
  });
});

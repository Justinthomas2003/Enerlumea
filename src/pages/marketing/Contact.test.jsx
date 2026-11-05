import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { submitContactMessage } from "../../api/enerlumeaApi";
import { findWcagViolations } from "../../test/a11y";
import Contact from "./Contact";

vi.mock("../../api/enerlumeaApi", () => ({
  submitContactMessage: vi.fn(),
}));

describe("Contact", () => {
  beforeEach(() => vi.clearAllMocks());

  it("submits the labelled form to the API and announces success", async () => {
    submitContactMessage.mockResolvedValue({ id: 1 });
    render(<Contact />);

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "Ada Lovelace" },
    });
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Subject"), {
      target: { value: "Solar estimates" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "I would like to learn about solar estimates." },
    });

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Your message was received and saved successfully.",
    );
    expect(submitContactMessage).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada@example.com",
      subject: "Solar estimates",
      message: "I would like to learn about solar estimates.",
    });
  });

  it("announces an API submission failure and keeps the message", async () => {
    submitContactMessage.mockRejectedValue(new Error("API is unavailable."));
    render(<Contact />);

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "Ada Lovelace" },
    });
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Subject"), {
      target: { value: "Solar estimates" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "I would like to learn about solar estimates." },
    });

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "API is unavailable.",
    );
    expect(screen.getByLabelText("Message")).toHaveValue(
      "I would like to learn about solar estimates.",
    );
  });

  it("has no detected WCAG 2.1 A or AA violations", async () => {
    const { container } = render(<main><Contact /></main>);

    await expect(findWcagViolations(container)).resolves.toEqual([]);
  });
});

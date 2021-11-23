import { slugify } from "../utils";

describe("slugify", () => {
  it("handles special characters", () => {
    expect(slugify("How do you convince your teammates to use XState?")).toBe(
      "how-do-you-convince-your-teammates-to-use-xstate"
    );
    expect(
      slugify("State Management: How to tell a bad boolean from a good boolean")
    ).toBe("state-management-how-to-tell-a-bad-boolean-from-a-good-boolean");
  });
});

describe("makeEmbedUrl", () => {
  it.todo("makes correct url strings from embed props");
});

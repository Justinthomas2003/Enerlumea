import axe from "axe-core";

const wcag21Aa = {
  // JSDOM has no canvas implementation for axe's color-contrast rule.
  rules: {
    "color-contrast": { enabled: false },
  },
  runOnly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
  },
};

export async function findWcagViolations(container) {
  const results = await axe.run(container, wcag21Aa);
  return results.violations.map(({ id, help, nodes }) => ({
    id,
    help,
    elements: nodes.map(({ target }) => target.join(", ")),
  }));
}

import { forwardRef } from "react";

export const Card = forwardRef(function Card(
  { as: Element = "div", className = "", ...props },
  ref,
) {
  const classes = ["eu-card", className].filter(Boolean).join(" ");

  return <Element {...props} ref={ref} className={classes} />;
});

import { forwardRef } from "react";

export const Button = forwardRef(function Button(
  {
    className = "",
    size = "medium",
    type = "button",
    variant = "primary",
    ...props
  },
  ref,
) {
  const classes = ["eu-button", className].filter(Boolean).join(" ");

  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={classes}
      data-size={size}
      data-variant={variant}
    />
  );
});

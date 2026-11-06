import { forwardRef, useId } from "react";

export const TextField = forwardRef(function TextField(
  {
    "aria-describedby": ariaDescribedBy,
    error,
    hint,
    id,
    label,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const descriptionIds = [
    ariaDescribedBy,
    hint != null ? hintId : null,
    error != null ? errorId : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="eu-field">
      <label className="eu-field-label" htmlFor={inputId}>
        {label}
      </label>
      <input
        {...props}
        ref={ref}
        id={inputId}
        className={["eu-input", props.className].filter(Boolean).join(" ")}
        aria-describedby={descriptionIds || undefined}
        aria-invalid={error != null ? true : undefined}
      />
      {hint != null && (
        <span className="eu-field-hint" id={hintId}>
          {hint}
        </span>
      )}
      {error != null && (
        <span className="eu-field-error" id={errorId} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

export default function PageLoading({ label = "Loading page…", className = "" }) {
  return (
    <div className={`page-loading ${className}`.trim()} role="status" aria-live="polite">
      <span className="page-loading-indicator" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default function ApiStatus({ loading, error, onRetry, resource }) {
  if (loading) {
    return <p className="api-status" role="status">Loading {resource}…</p>;
  }

  if (error) {
    return (
      <div className="api-error" role="alert">
        <span>{error}</span>
        <button type="button" onClick={onRetry}>Retry</button>
      </div>
    );
  }

  return null;
}

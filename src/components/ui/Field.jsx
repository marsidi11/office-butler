export default function Field({ label, error, children }) {
  return (
    <div className="form-field">
      <label className="label">{label}</label>
      {children}
      {error ? <span className="error-text">{error}</span> : null}
    </div>
  );
}

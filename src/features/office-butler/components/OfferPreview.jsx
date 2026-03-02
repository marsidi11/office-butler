function formatEuro(value) {
  return `€${Number(value).toLocaleString('de-DE', { minimumFractionDigits: 2 })}`;
}

function formatDate(date) {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function PreviewRow({ label, value, accent = false }) {
  return (
    <div className="preview-row">
      <span className="preview-label">{label}</span>
      <span className={`preview-value ${accent ? 'accent-text' : ''}`}>{value}</span>
    </div>
  );
}

export default function OfferPreview({ offer }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-icon">📄</span>
        <h3 className="card-title">Generated Offer</h3>
      </div>

      <div className="preview-grid">
        <PreviewRow label="Client" value={offer.name} />
        <PreviewRow label="Service" value={offer.serviceType} />
        <PreviewRow label="Price" value={formatEuro(offer.price)} accent />
      </div>

      <div className="preview-footer">
        <span className="timestamp">Created {formatDate(new Date())}</span>
        <span className="badge">Draft</span>
      </div>
    </div>
  );
}

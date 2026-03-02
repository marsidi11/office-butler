import { useState } from 'react';
import { AI_SUGGESTIONS, INITIAL_TASKS, SERVICE_TYPES } from './data';
import './officeButler.css';

const INITIAL_FORM_DATA = {
  name: '',
  serviceType: SERVICE_TYPES[0],
  price: '',
};

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

function FormField({ label, children }) {
  return (
    <div className="form-field">
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

function OfferPreview({ offer }) {
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

function PreviewRow({ label, value, accent = false }) {
  return (
    <div className="preview-row">
      <span className="preview-label">{label}</span>
      <span className={`preview-value ${accent ? 'accent-text' : ''}`}>{value}</span>
    </div>
  );
}

function TaskList({ tasks, onToggle }) {
  const doneCount = tasks.filter((task) => task.done).length;

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-icon">✓</span>
        <h3 className="card-title">Next Steps</h3>
        <span className="task-count">
          {doneCount}/{tasks.length}
        </span>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item" onClick={() => onToggle(task.id)}>
            <div className={task.done ? 'checkbox checkbox-done' : 'checkbox'}>
              {task.done ? <span className="check-mark">✓</span> : null}
            </div>
            <span className={task.done ? 'task-text task-text-done' : 'task-text'}>{task.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AISuggestionBox({ serviceType }) {
  const suggestion = AI_SUGGESTIONS[serviceType] ?? AI_SUGGESTIONS['Office Cleaning'];

  return (
    <div className="ai-card">
      <div className="ai-header">
        <span className="ai-icon">✦</span>
        <span className="ai-label">AI Suggestion</span>
      </div>
      <p className="ai-text">{suggestion}</p>
    </div>
  );
}

export default function OfficeButlerApp() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [offer, setOffer] = useState(null);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'Client name is required';
    }

    if (!formData.price || Number(formData.price) <= 0) {
      nextErrors.price = 'Enter a valid price';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleGenerate = () => {
    if (!validate()) return;
    setOffer({ ...formData });
    setTasks(INITIAL_TASKS.map((task) => ({ ...task, done: false })));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setOffer(null);
    setErrors({});
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const updateField = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="office-butler-page">
      <div className="bg-pattern" />

      <div className="container">
        <header className="header">
          <div className="logo-row">
            <div className="logo">OB</div>
            <div>
              <h1 className="title">Office Butler</h1>
              <p className="subtitle">Offer Management</p>
            </div>
          </div>
        </header>

        <div className="layout">
          <section className="form-section">
            <div className="card">
              <div className="card-header">
                <span className="card-icon">+</span>
                <h3 className="card-title">New Offer</h3>
              </div>

              <FormField label="Client Name">
                <input
                  className={`input ${errors.name ? 'input-error' : ''}`}
                  type="text"
                  placeholder="e.g. Acme Corp"
                  value={formData.name}
                  onChange={updateField('name')}
                />
                {errors.name ? <span className="error-text">{errors.name}</span> : null}
              </FormField>

              <FormField label="Service Type">
                <select className="input" value={formData.serviceType} onChange={updateField('serviceType')}>
                  {SERVICE_TYPES.map((serviceType) => (
                    <option key={serviceType} value={serviceType}>
                      {serviceType}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Price (€)">
                <input
                  className={`input ${errors.price ? 'input-error' : ''}`}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={updateField('price')}
                />
                {errors.price ? <span className="error-text">{errors.price}</span> : null}
              </FormField>

              <div className="button-row">
                <button type="button" className="primary-btn" onClick={handleGenerate}>
                  Generate Offer
                </button>
                {offer ? (
                  <button type="button" className="secondary-btn" onClick={handleReset}>
                    Reset
                  </button>
                ) : null}
              </div>
            </div>

            <AISuggestionBox serviceType={formData.serviceType} />
          </section>

          <section className="result-section">
            {offer ? (
              <>
                <OfferPreview offer={offer} />
                <TaskList tasks={tasks} onToggle={toggleTask} />
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">↗</div>
                <p className="empty-title">No offer yet</p>
                <p className="empty-text">
                  Fill in the form and hit &quot;Generate Offer&quot; to see a preview here.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

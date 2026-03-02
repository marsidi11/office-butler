import { useState } from 'react';
import AISuggestionBox from './components/AISuggestionBox';
import OfferForm from './components/OfferForm';
import OfferPreview from './components/OfferPreview';
import TaskList from './components/TaskList';
import { INITIAL_TASKS, SERVICE_TYPES } from './data';
import './officeButler.css';

const INITIAL_FORM_DATA = {
  name: '',
  serviceType: SERVICE_TYPES[0],
  price: '',
};

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

  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const handleFieldChange = (field) => (event) => {
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
            <OfferForm
              formData={formData}
              errors={errors}
              serviceTypes={SERVICE_TYPES}
              hasOffer={Boolean(offer)}
              onFieldChange={handleFieldChange}
              onGenerate={handleGenerate}
              onReset={handleReset}
            />

            <AISuggestionBox serviceType={formData.serviceType} />
          </section>

          <section className="result-section">
            {offer ? (
              <>
                <OfferPreview offer={offer} />
                <TaskList tasks={tasks} onToggle={handleToggleTask} />
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

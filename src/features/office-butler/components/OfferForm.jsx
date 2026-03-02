import Button from '../../../components/ui/Button';
import Field from '../../../components/ui/Field';
import Input from '../../../components/ui/Input';

export default function OfferForm({
  formData,
  errors,
  serviceTypes,
  hasOffer,
  onFieldChange,
  onGenerate,
  onReset,
}) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-icon">+</span>
        <h3 className="card-title">New Offer</h3>
      </div>

      <Field label="Client Name" error={errors.name}>
        <Input
          type="text"
          placeholder="e.g. Acme Corp"
          value={formData.name}
          onChange={onFieldChange('name')}
          hasError={Boolean(errors.name)}
        />
      </Field>

      <Field label="Service Type">
        <Input as="select" value={formData.serviceType} onChange={onFieldChange('serviceType')}>
          {serviceTypes.map((serviceType) => (
            <option key={serviceType} value={serviceType}>
              {serviceType}
            </option>
          ))}
        </Input>
      </Field>

      <Field label="Price (€)" error={errors.price}>
        <Input
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={formData.price}
          onChange={onFieldChange('price')}
          hasError={Boolean(errors.price)}
        />
      </Field>

      <div className="button-row">
        <Button onClick={onGenerate}>Generate Offer</Button>
        {hasOffer ? (
          <Button variant="secondary" onClick={onReset}>
            Reset
          </Button>
        ) : null}
      </div>
    </div>
  );
}

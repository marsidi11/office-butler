const VARIANT_CLASS = {
  primary: 'primary-btn',
  secondary: 'secondary-btn',
};

export default function Button({ variant = 'primary', className = '', type = 'button', ...props }) {
  const baseClass = VARIANT_CLASS[variant] ?? VARIANT_CLASS.primary;
  const buttonClassName = `${baseClass} ${className}`.trim();

  return <button type={type} className={buttonClassName} {...props} />;
}

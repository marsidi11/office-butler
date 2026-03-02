export default function Input({ as = 'input', hasError = false, className = '', children, ...props }) {
  const Component = as;
  const inputClassName = `input ${hasError ? 'input-error' : ''} ${className}`.trim();

  return (
    <Component className={inputClassName} {...props}>
      {children}
    </Component>
  );
}

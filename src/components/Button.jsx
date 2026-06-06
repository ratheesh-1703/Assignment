export default function Button({ children, type = 'button', variant = 'primary', fullWidth = false, onClick, disabled, className = '' }) {
  const buttonClassName = ['button', `button--${variant}`, fullWidth ? 'button--full' : '', className].filter(Boolean).join(' ');

  return (
    <button className={buttonClassName} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
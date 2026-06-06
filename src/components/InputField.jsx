export default function InputField({ label, name, type = 'text', value, onChange, placeholder, autoComplete, required = false }) {
  return (
    <div className="field">
      <label
        className="field__label"
        htmlFor={name}
        style={{
          position: 'absolute',
          top: 0,
          left: '10px',
          zIndex: 2,
          backgroundColor: '#ffffff',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          padding: '0 4px',
          color: '#6c25ff',
          fontSize: '11px',
          fontWeight: 600,
          lineHeight: 1,
        }}
      >
        {label}
        {required ? <span aria-hidden="true" style={{ color: '#fc5a5a', marginLeft: '2px' }}>*</span> : null}
      </label>
      <input
        id={name}
        className="field__input"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      />
    </div>
  );
}
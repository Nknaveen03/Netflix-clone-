import React, { useState } from 'react';
import styles from './InputField.module.css';

function InputField({ id, label, type = 'text', value, onChange, error }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType  = isPassword && showPassword ? 'text' : type;

  return (
    <div className={`${styles.wrapper} ${error ? styles.hasError : ''}`}>
      <div className={`${styles.field} ${value ? styles.filled : ''}`}>
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          className={styles.input}
          autoComplete={isPassword ? 'current-password' : 'email'}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>

        {/* Toggle password visibility */}
        {isPassword && value && (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? 'HIDE' : 'SHOW'}
          </button>
        )}
      </div>

      {/* Inline error message */}
      {error && (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default InputField;

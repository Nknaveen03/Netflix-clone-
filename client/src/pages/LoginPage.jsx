import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NetflixLogo  from '../components/NetflixLogo';
import InputField   from '../components/InputField';
import DemoHint     from '../components/DemoHint';
import authConfig   from '../data/authConfig';
import styles       from './LoginPage.module.css';

// ── Frontend validation ──────────────────────────────
function validate(email, password) {
  const errors = {};

  if (!email.trim()) {
    errors.email = 'Please enter your email or phone number.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!password) {
    errors.password = 'Your password must contain between 4 and 60 characters.';
  } else if (password.length < 4 || password.length > 60) {
    errors.password = 'Your password must contain between 4 and 60 characters.';
  }

  return errors;
}

// ────────────────────────────────────────────────────
function LoginPage() {
  const navigate = useNavigate();

  // Form state
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  // Error / UI state
  const [fieldErrors,  setFieldErrors]  = useState({});
  const [serverError,  setServerError]  = useState('');
  const [isLoading,    setIsLoading]    = useState(false);
  const [rememberMe,   setRememberMe]   = useState(false);

  // ── Submit handler ─────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    // 1. Frontend validation
    const errors = validate(email, password);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    // 2. POST to Express backend via Axios
    setIsLoading(true);
    try {
      const response = await axios.post(authConfig.loginEndpoint, {
        email:    email.trim(),
        password: password,
      });

      // 3. On success — store user & navigate to dashboard
      sessionStorage.setItem('netflix_user', JSON.stringify(response.data.user));
      navigate('/dashboard');

    } catch (err) {
      // 4. Show error returned by the backend (or a fallback)
      const message =
        err.response?.data?.message ||
        'Something went wrong. Please try again later.';
      setServerError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Fill credentials from the demo hint ───────────
  const handleDemoFill = ({ email: e, password: p }) => {
    setEmail(e);
    setPassword(p);
    setFieldErrors({});
    setServerError('');
  };

  return (
    <div className={styles.page}>
      {/* Background artwork */}
      <div className={styles.bg} aria-hidden="true" />

      {/* Top navigation bar */}
      <header className={styles.header}>
        <NetflixLogo height={38} />
      </header>

      {/* Login card */}
      <main className={styles.main}>
        <div className={styles.card}>
          <h1 className={styles.title}>Sign In</h1>

          {/* Server-side error banner */}
          {serverError && (
            <div className={styles.serverError} role="alert">
              {serverError}
            </div>
          )}

          {/* Login form */}
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <InputField
              id="email"
              label="Email or phone number"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: '' }));
                setServerError('');
              }}
              error={fieldErrors.email}
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: '' }));
                setServerError('');
              }}
              error={fieldErrors.password}
            />

            {/* Submit */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? <span className={styles.spinner} /> : 'Sign In'}
            </button>

            {/* Remember me + Need help row */}
            <div className={styles.extras}>
              <label className={styles.checkLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={styles.checkbox}
                />
                Remember me
              </label>
              <span className={styles.helpLink}>Need help?</span>
            </div>
          </form>

          {/* Sign up link */}
          <p className={styles.signupText}>
            New to Netflix?{' '}
            <span className={styles.signupLink}>Sign up now</span>
          </p>

          <p className={styles.captcha}>
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
            <span className={styles.learnMore}>Learn more.</span>
          </p>

          {/* Demo credentials helper */}
          <DemoHint onFill={handleDemoFill} />
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerPhone}>Questions? Call 000-800-919-1694</p>
          <div className={styles.footerLinks}>
            {['FAQ', 'Help Centre', 'Terms of Use', 'Privacy', 'Cookie Preferences', 'Corporate Information'].map(
              (link) => (
                <span key={link} className={styles.footerLink}>{link}</span>
              )
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;

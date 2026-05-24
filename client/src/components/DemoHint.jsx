import React, { useState } from 'react';
import authConfig from '../data/authConfig';
import styles from './DemoHint.module.css';

function DemoHint({ onFill }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button className={styles.toggle} onClick={() => setOpen((v) => !v)}>
        🧪 Demo credentials {open ? '▲' : '▼'}
      </button>

      {open && (
        <div className={styles.panel}>
          {authConfig.demoCredentials.map((cred, i) => (
            <div key={i} className={styles.row}>
              <div className={styles.creds}>
                <span className={styles.credItem}>
                  <span className={styles.credLabel}>Email</span>
                  {cred.email}
                </span>
                <span className={styles.credItem}>
                  <span className={styles.credLabel}>Pass</span>
                  {cred.password}
                </span>
              </div>
              <button className={styles.fill} onClick={() => onFill(cred)}>
                Use
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DemoHint;

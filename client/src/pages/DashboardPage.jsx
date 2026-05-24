import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NetflixLogo from '../components/NetflixLogo';
import styles from './DashboardPage.module.css';

// Dummy show tiles for the dashboard grid
const SHOWS = [
  { id: 1, title: 'Stranger Things', genre: 'Sci-Fi · Horror',  color: '#1a1a2e' },
  { id: 2, title: 'Squid Game',      genre: 'Thriller · Drama', color: '#1c0a00' },
  { id: 3, title: 'The Crown',       genre: 'Drama · History',  color: '#0a1628' },
  { id: 4, title: 'Ozark',           genre: 'Crime · Drama',    color: '#001a0d' },
  { id: 5, title: 'Wednesday',       genre: 'Comedy · Horror',  color: '#0d0d0d' },
  { id: 6, title: 'Money Heist',     genre: 'Action · Crime',   color: '#1a0000' },
];

function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user saved during login
    const stored = sessionStorage.getItem('netflix_user');
    if (!stored) {
      // Not logged in — send back to login
      navigate('/');
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  const handleSignOut = () => {
    sessionStorage.removeItem('netflix_user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className={styles.page}>
      {/* Nav */}
      <header className={styles.header}>
        <NetflixLogo height={32} />
        <div className={styles.navRight}>
          <span className={styles.navItem}>Home</span>
          <span className={styles.navItem}>TV Shows</span>
          <span className={styles.navItem}>Movies</span>
          <div className={styles.profile}>
            <div className={styles.avatar}>{user.avatar}</div>
            <div className={styles.dropdown}>
              <div className={styles.dropdownUser}>
                <div className={styles.dropdownAvatar}>{user.avatar}</div>
                <div>
                  <p className={styles.dropdownName}>{user.name}</p>
                  <p className={styles.dropdownPlan}>{user.plan} Plan</p>
                </div>
              </div>
              <hr className={styles.dropdownDivider} />
              <button onClick={handleSignOut} className={styles.signOutBtn}>
                Sign out of Netflix
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero banner */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>✓ Logged in as {user.email}</div>
          <h1 className={styles.heroTitle}>Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className={styles.heroSub}>
            Your {user.plan} plan is active. Ready to watch?
          </p>
          <div className={styles.heroActions}>
            <button className={styles.playBtn}>▶ Play</button>
            <button className={styles.infoBtn}>ⓘ More Info</button>
          </div>
        </div>
      </section>

      {/* Show grid */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Trending Now</h2>
        <div className={styles.grid}>
          {SHOWS.map((show) => (
            <div key={show.id} className={styles.tile} style={{ background: show.color }}>
              <div className={styles.tileContent}>
                <p className={styles.tileTitle}>{show.title}</p>
                <p className={styles.tileGenre}>{show.genre}</p>
              </div>
              <div className={styles.tileOverlay}>
                <button className={styles.tilePlay}>▶</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;

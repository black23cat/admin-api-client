import { useState } from 'react';
import Dots from '../../assets/svg/Dots';
import LogoPgBig from '../../assets/svg/LogoPgBig';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header>
      <div className={styles['company-logo-wrapper']}>
        <LogoPgBig data-testid="company-logo" />
      </div>
      <div className={styles['dropdown-button-wrapper']}>
        <button onClick={toggleMenu} className={isOpen ? styles.active : ''}>
          <Dots data-testid="dropdown" />
        </button>
      </div>
      <nav
        className={`${styles['dropdown-wrapper']} ${isOpen ? styles.open : ''}`}
      >
        {isOpen && (
          <div className="dropdown-items">
            <ThemeToggle />
          </div>
        )}
      </nav>
    </header>
  );
}

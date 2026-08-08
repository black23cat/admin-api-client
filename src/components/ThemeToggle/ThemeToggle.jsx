import { useContext } from 'react';
import { ThemeContext } from '../../App';
import darkModeIcon from '../../assets/images/dark-mode.svg';
import lightModeIcon from '../../assets/images/light-mode.png';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle({ sidebar = false }) {
  const [theme, setTheme] = useContext(ThemeContext);
  const switchTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <div
      className={`${styles['button-wrapper']} ${sidebar ? styles.sidebar : ''}`}
    >
      <button onClick={switchTheme}>
        <div
          className={`${styles['switch']} ${
            theme === 'dark' ? styles['dark'] : ''
          }`}
        >
          <img
            src={theme === 'dark' ? darkModeIcon : lightModeIcon}
            alt="theme toggle"
          />
        </div>
        {sidebar && <p>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>}
      </button>
    </div>
  );
}

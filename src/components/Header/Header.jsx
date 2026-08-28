import Dots from '../../assets/svg/Dots';
import LogoPgBig from '../../assets/svg/LogoPgBig';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';
import SidebarIcon from '../../assets/svg/SidebarIcon';

export default function Header({ openSidebar }) {
  return (
    <header>
      <div className={styles['open-sidebar']}>
        <button data-testid="open-sidebar" onClick={openSidebar}>
          <SidebarIcon />
        </button>
      </div>
      <div className={styles['company-logo-wrapper']}>
        <LogoPgBig data-testid="company-logo" />
      </div>
    </header>
  );
}

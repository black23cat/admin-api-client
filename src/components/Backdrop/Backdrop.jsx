import styles from './Backdrop.module.css';

export default function Backdrop({ isOpen, closeSidebar }) {
  return (
    <div
      onClick={closeSidebar}
      className={`${styles.backdrop} ${isOpen ? styles.show : ''}`}
      aria-hidden={true}
    ></div>
  );
}

import { Link } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserContext } from '../../App';
import LogoPgSmall from '../../assets/svg/LogoPgSmall';
import styles from './LoginForm.module.css';
import warnIcon from '../../assets/images/warning.svg';
import checklistIcon from '../../assets/images/checklist.svg';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginForm() {
  const [fieldsError, setFieldsError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [formInput, setFormInput] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [setUser] = useContext(UserContext);

  const handleFormInput = (e) => {
    setFieldsError(false);
    setServerError(false);
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const userInput = { ...formInput, [fieldName]: fieldValue };
    setFormInput(userInput);
  };

  const handleFormSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formInput),
      });
      const results = await response.json();

      if (response.status === 200 || response.ok) {
        localStorage.setItem('token', results);
        setFieldsError(false);
        setIsLogin(true);
        return;
      }
      if (response.status.toString().startsWith('5')) {
        setServerError(true);
      }
      setFieldsError(true);
    } catch {
      setServerError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLogin) {
      const timeout = setTimeout(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);

        setUser(decodedToken.user);
      }, 500);
      return () => clearTimeout(timeout);
    }
  });

  return (
    <main className="login">
      <section className={styles['first-panel']}>
        {' '}
        <div className={styles['theme-toggle-wrapper']}>
          <ThemeToggle />
        </div>
        <div className={styles.logo}>
          <LogoPgSmall />
        </div>
        <h3>Selamat Datang di website admin Polygraphic</h3>
      </section>
      <section className={styles['second-panel']}>
        <form onSubmit={handleFormSubmit}>
          <div className={styles['login-success']}>
            {isLogin && (
              <p>
                Berhasil login, mengalihkan ke halaman utama...{' '}
                <img src={checklistIcon} alt="" width={'24px'} />
              </p>
            )}
          </div>
          <div className={styles['input-wrapper']}>
            <div
              className={
                fieldsError || serverError ? styles['form-invalid'] : ''
              }
            >
              <label htmlFor="username">Email or Username :</label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={handleFormInput}
                required
                autoComplete="username"
              />
            </div>
            <div
              className={
                fieldsError || serverError ? styles['form-invalid'] : ''
              }
            >
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                name="password"
                id="password"
                min="6"
                onChange={handleFormInput}
                required
              />
            </div>
          </div>
          <div className={styles['login-error']}>
            {(fieldsError || serverError) && (
              <p>
                <img src={warnIcon} alt="input error" width="18px" />{' '}
                {serverError
                  ? 'Terjadi masalah dengan server'
                  : 'Username atau email atau pasword salah'}
              </p>
            )}
          </div>
          <div>
            <button
              className={styles['login-btn']}
              type="submit"
              disabled={loading}
            >
              {loading && <div className="spinner"></div>}
              LOGIN
            </button>
          </div>{' '}
          <p className={styles['contact-admin']}>
            Belum punya akun? <a>Hubungi administrator</a>
          </p>
        </form>
      </section>
    </main>
  );
}

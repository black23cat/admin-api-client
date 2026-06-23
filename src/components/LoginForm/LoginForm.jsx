import { Link } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserContext } from '../../App';

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginForm() {
  const [fieldsError, setFieldsError] = useState('');
  const [formInput, setFormInput] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [setUser] = useContext(UserContext);

  const handleFormInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const userInput = { ...formInput, [fieldName]: fieldValue };
    setFormInput(userInput);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formInput),
      });
      const results = await response.json();
      if (response.status === 200) {
        localStorage.setItem('token', results);
        setFieldsError('');
        setIsLogin(true);
        return;
      }
      if (response.status === 400) {
        setFieldsError(results.message);
        return;
      }
      if (response.status === 404) {
        setFieldsError(results);
        return;
      }
    } catch {
      setFieldsError('Terjadi masalah dengan server');
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
    <section className="login">
      <form onSubmit={handleFormSubmit}>
        <h3>Login</h3>
        {isLogin && (
          <p className="login-succes">Login Success, Redirecting.....</p>
        )}
        {fieldsError !== '' && (
          <ul className="form-error">
            <li>{fieldsError}</li>
          </ul>
        )}
        <div className="input-wrapper">
          <p>
            <label htmlFor="username">Email or Username :</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleFormInput}
              required
            />
          </p>
          <p>
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              name="password"
              id="password"
              min="6"
              onChange={handleFormInput}
              required
            />
          </p>
        </div>
        <p>
          <button type="submit">LOGIN</button>
        </p>
      </form>
    </section>
  );
}

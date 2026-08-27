import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import LoginForm from './components/LoginForm/LoginForm';
import { jwtDecode } from 'jwt-decode';

const currentTime = new Date();
export const UserContext = createContext({});
export const ThemeContext = createContext('light');
export const UserScreenData = createContext({});

export default function App() {
  const [user, setUser] = useState(userInit);
  const [theme, setTheme] = useState(themeInit);
  const [userScreen, setUserScreen] = useState(getUserScreenData);

  useEffect(() => {
    const resize = () => {
      setUserScreen(getUserScreenData());
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  });

  if (user === null) {
    return (
      <UserScreenData value={[userScreen]}>
        <UserContext value={[setUser]}>
          <ThemeContext value={[theme, setTheme]}>
            <AppWrapper theme={theme}>
              <LoginForm />
            </AppWrapper>
          </ThemeContext>
        </UserContext>
      </UserScreenData>
    );
  }

  return (
    <UserScreenData value={[userScreen]}>
      <UserContext value={[user]}>
        <ThemeContext value={[theme, setTheme]}>
          <AppWrapper theme={theme}>
            <Header />
            <Sidebar />
            <Outlet />
          </AppWrapper>
        </ThemeContext>
      </UserContext>
    </UserScreenData>
  );
}

function userInit() {
  // Check if user still have valid jwt on local storage
  const token = localStorage.getItem('token');
  if (token === null) {
    return null;
  }
  const decodedToken = jwtDecode(token);
  const tokenExpTime = new Date(decodedToken.exp * 1000); //jwt exp time must be times 1000 to get milisecond value
  if (currentTime > tokenExpTime) {
    localStorage.removeItem('token');
    return null;
  }
  return decodedToken.user;
}

function themeInit() {
  const localTheme = localStorage.getItem('theme');
  const osPreferedTheme = window.matchMedia(
    '(preferes-color-scheme : dark)',
  ).matches;
  if (localTheme === null && !osPreferedTheme) {
    localStorage.setItem('theme', 'light');
    return 'light';
  } else if (
    localTheme !== null &&
    (localTheme === 'dark' || localTheme === 'light')
  ) {
    return localTheme;
  } else if (localTheme === null && osPreferedTheme) {
    localStorage.setItem('theme', osPreferedTheme);
    return osPreferedTheme;
  } else if (
    localTheme !== null &&
    (localTheme !== 'dark' || localTheme !== 'light')
  ) {
    localStorage.setItem('theme', 'light');
    return 'light';
  }
}

function getUserScreenData() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

function AppWrapper({ theme, children }) {
  return (
    <div className="app" data-theme={theme}>
      {children}
    </div>
  );
}

import { createContext, useState } from 'react';
import { Outlet } from 'react-router';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import LoginForm from './components/LoginForm/LoginForm';
import { jwtDecode } from 'jwt-decode';

const currentTime = new Date();

function init() {
  // Check if user still have valid jwt on local storage
  const token = localStorage.getItem('token');
  if (token === null) {
    return null;
  }
  const decodedToken = jwtDecode(token);
  const tokenExpTime = new Date(decodedToken.exp * 1000); //jwt exp time must be times 1000 to get milisecond value
  if (currentTime > tokenExpTime) {
    return null;
  }
  return decodedToken.user;
}

export const UserContext = createContext({});

export default function App() {
  const [user, setUser] = useState(init);

  if (user === null) {
    return (
      <UserContext value={[setUser]}>
        <LoginForm />
      </UserContext>
    );
  }

  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
    </>
  );
}

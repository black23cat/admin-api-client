import { createContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import LoginForm from './components/LoginForm/LoginForm';
// import { jwtDecode } from 'jwt-decode';

// const currentTime = new Date();
export const UserContext = createContext({});

export default function App() {
  const [user, setUser] = useState(null);

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

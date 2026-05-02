import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../components/Form/LoginForm';
import { MemoryRouter } from 'react-router';

const mockUser = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  email: 'johndoe@email.com',
  password: 'johndoe123',
  role: 'Admin',
};

describe('Render Login Form', () => {
  it('Render forms correctly', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );
    const usernameField = screen.getByLabelText('Email or Username :');
    const passwordField = screen.getByLabelText('Password :');
    const submitBtn = screen.getByText('LOGIN');
    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });
});

describe('Form submit data correctly', () => {
  it('Show error for incorrect username or email or password input', async () => {
    const user = userEvent.setup();
    globalThis.fetch = vi.fn(() => {
      return Promise.resolve({
        status: 400,
        ok: false,
        json: () =>
          Promise.resolve({
            message: 'Username or Email or Password incorrect',
          }),
      });
    });
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );
    const usernameField = screen.getByLabelText('Email or Username :');
    const passwordField = screen.getByLabelText('Password :');
    const submitBtn = screen.getByText('LOGIN');

    await user.type(usernameField, 'johndoe');
    await user.type(passwordField, 'johndoe123');

    expect(usernameField).toHaveValue('johndoe');
    expect(passwordField).toHaveValue('johndoe123');

    await user.click(submitBtn);
    const errorMessage = screen.getByText(
      'Username or Email or Password incorrect',
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Show success message on login', async () => {
    const user = userEvent.setup();
    globalThis.fetch = vi.fn(() => {
      return Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(mockUser),
      });
    });
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );
    const usernameField = screen.getByLabelText('Email or Username :');
    const passwordField = screen.getByLabelText('Password :');
    const submitBtn = screen.getByText('LOGIN');

    await user.type(usernameField, 'johndoe');
    await user.type(passwordField, 'johndoe123');

    await user.click(submitBtn);
    const successMessage = screen.getByText('Login Success, Redirecting.....');
    expect(successMessage).toBeInTheDocument();
  });
});

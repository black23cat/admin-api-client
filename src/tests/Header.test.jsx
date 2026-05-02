import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header/Header';
import { MemoryRouter } from 'react-router';

describe('Render Header correctly', () => {
  it('Render forms correctly', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const themeToggle = screen.getByAltText('toggle theme');
    expect(themeToggle).toBeInTheDocument();
    const dropdown = screen.getByAltText('dropdown');
    expect(dropdown).toBeInTheDocument();
  });
});

describe('Header buttons working correctly', () => {
  it('Toggle dark/light mode', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const handleToggleTheme = vi.fn();
    render(<Header handleToggleTheme={handleToggleTheme} />);

    const themeToggle = screen.getByAltText('toggle theme');
    await user.click(themeToggle);
    expect(themeToggle).toBeInTheDocument();
    expect(handleToggleTheme).toHaveBeenCalled();
  });
});

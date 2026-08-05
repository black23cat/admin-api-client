import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router';

describe('Render Header correctly', () => {
  it('Render forms correctly', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const companyLogo = screen.getByTestId('company-logo');
    expect(companyLogo).toBeInTheDocument();
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toBeInTheDocument();
  });
});

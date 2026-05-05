import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Sidebar from '../components/Sidebar/Sidebar';

describe('Render Sidebar', () => {
  it('Render Sidebar correctly', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );
    const menu = screen.getByText('Menu');
    const purchaseOrderBtn = screen.getByText('Puchase Order (PO)');
    const invoice = screen.getByText('Invoice');
    const jobData = screen.getByText('Data Kerja');
    const weeklyCash = screen.getByText('Kas Mingguan');
    expect(menu).toBeInTheDocument();
    expect(purchaseOrderBtn).toBeInTheDocument();
    expect(invoice).toBeInTheDocument();
    expect(jobData).toBeInTheDocument();
    expect(weeklyCash).toBeInTheDocument();
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Sidebar from './Sidebar';
import userEvent from '@testing-library/user-event';

let mockNavigate;

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return { ...actual, useNavigate: () => mockNavigate };
});

beforeEach(() => {
  mockNavigate = vi.fn();
});

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

describe('Sidebar button redirect to correct route', () => {
  it('Redirect to correct route', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    const purchaseOrderBtn = screen.getByRole('button', {
      name: 'Puchase Order (PO)',
    });
    const invoice = screen.getByRole('button', { name: 'Invoice' });
    await user.click(purchaseOrderBtn);
    await user.click(invoice);
    expect(mockNavigate).toHaveBeenCalledTimes(2);
    expect(mockNavigate.mock.calls[0][0]).toEqual('/purchase-order');
    expect(mockNavigate.mock.calls[1][0]).toEqual('/invoice');
  });
});

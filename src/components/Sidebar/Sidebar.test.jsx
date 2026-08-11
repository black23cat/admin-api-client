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
    const sidebarToggle = screen.getByTestId('toggle-sidebar');
    const headerText = screen.getByText('PrintAdmin');
    const headerSubText = screen.getByText('Polygraphic');
    const purchaseOrderBtn = screen.getByText('Data PO');
    const invoice = screen.getByText('Invoice');
    const jobData = screen.getByText('Data Kerja');
    const weeklyCash = screen.getByText('Kas Mingguan');
    expect(sidebarToggle).toBeInTheDocument();
    expect(headerText).toBeInTheDocument();
    expect(headerSubText).toBeInTheDocument();
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
      name: 'Data PO',
    });
    const invoice = screen.getByRole('button', { name: 'Invoice' });
    const jobData = screen.getByRole('button', { name: 'Data Kerja' });
    const weeklyCash = screen.getByRole('button', { name: 'Kas Mingguan' });
    await user.click(purchaseOrderBtn);
    await user.click(invoice);
    expect(mockNavigate).toHaveBeenCalledTimes(2);
    await user.click(jobData);
    await user.click(weeklyCash);
    expect(mockNavigate).toHaveBeenCalledTimes(4);
    expect(mockNavigate.mock.calls[0][0]).toEqual('/purchase-order');
    expect(mockNavigate.mock.calls[1][0]).toEqual('/invoice');
    expect(mockNavigate.mock.calls[2][0]).toEqual('/job-data');
    expect(mockNavigate.mock.calls[3][0]).toEqual('/payment');
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { mockPoData } from '../utils/mockData';
import PoPage from '../components/PoPage/PoPage';
import PoCard from '../components/PoCard/PoCard';

// Mock PoCard component
vi.mock('../components/PoCard/PoCard', () => {
  return {
    default: () => <div>Purchase Order Card</div>,
  };
});

beforeEach(() => {
  const mockFetch = vi.fn(() => {
    return Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mockPoData),
    });
  });
  globalThis.fetch = mockFetch;
});

describe('Render Purchase Order Main Page', () => {
  it('Render Purchase Order Main Page correctly', async () => {
    render(
      <MemoryRouter>
        <PoPage />
      </MemoryRouter>,
    );
    const header = screen.getByText('Purchase Order');
    const newPoButton = screen.getByText('New Purchase Order', {
      exact: false,
    });
    const invoiceButton = screen.getByText('Create Invoice');
    expect(header).toBeInTheDocument();
    expect(newPoButton).toBeInTheDocument();
    expect(invoiceButton).toBeInTheDocument();
    await waitFor(() => {
      const poCard = screen.getAllByText('Purchase Order Card');
      expect(poCard.length).toBeGreaterThan(0);
    });
  });
});

describe('Buttons working correctly', () => {
  it('Invoice button is disabled when no po is selected', () => {
    render(
      <MemoryRouter>
        <PoPage />
      </MemoryRouter>,
    );
    const invoiceButton = screen.getByText('Create Invoice');
    expect(invoiceButton).toBeDisabled();
  });

  it('Send post request to create invoice when user has selected po', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const mockFetch = vi.fn().mockResolvedValueOnce(() => {
      return Promise.resolve({
        status: 201,
        ok: true,
        json: () => Promise.resolve('Created'),
      });
    });
    globalThis.fetch = mockFetch;
    render(
      <MemoryRouter>
        <PoPage />
      </MemoryRouter>,
    );
    const createInvoiceBtn = screen.getByText('Create Invoice');

    await waitFor(async () => {
      const cardsCheckbox = screen.getAllByRole('checkbox');
      await user.click(cardsCheckbox[0]);
    });

    await user.click(createInvoiceBtn);
    expect(mockFetch).toHaveBeenCalled();
  });
  it('Render error message when failed to create invoice', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const mockFetch = vi.fn().mockRejectedValueOnce(() => {
      return Promise.reject({
        status: 500,
        ok: true,
        json: () => Promise.reject('Server Error'),
      });
    });
    globalThis.fetch = mockFetch;
    render(
      <MemoryRouter>
        <PoPage />
      </MemoryRouter>,
    );
    const createInvoiceBtn = screen.getByText('Create Invoice');

    await waitFor(async () => {
      const cardsCheckbox = screen.getAllByRole('checkbox');
      await user.click(cardsCheckbox[0]);
    });

    await user.click(createInvoiceBtn);
    expect(mockFetch).toHaveBeenCalled();
    await waitFor(() => {
      const error = screen.getByText('Gagal membuat invoice');
      expect(error).toBeInTheDocument();
    });
  });
});

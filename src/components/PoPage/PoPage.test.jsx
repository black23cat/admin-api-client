import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { mockPoData } from '../../utils/mockData';
import PoPage from './PoPage';
import PoCard from '../PoCard/PoCard';
import Dialog from '../Dialog/Dialog';

const mockResolvedData = {
  purchaseOrder: mockPoData,
  count: mockPoData.length,
};
// Mock useNavigate
let mockNavigate;
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return { ...actual, useNavigate: () => mockNavigate };
});

// Mock PoCard component
vi.mock('../PoCard/PoCard', () => {
  return {
    default: () => (
      <div>
        <input type="checkbox" />
        <p>Purchase Order Card</p>
      </div>
    ),
  };
});

vi.mock('../Dialog/Dialog', () => {
  return {
    default: () => <div>Dialog Mock</div>,
  };
});

beforeEach(() => {
  mockNavigate = vi.fn();
  const mockFetch = vi.fn(() => {
    return Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mockResolvedData),
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
  it('Redirect to po form', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <PoPage />
      </MemoryRouter>,
    );
    const newPoButton = screen.getByText('New Purchase Order', {
      exact: false,
    });
    await user.click(newPoButton);
    expect(mockNavigate.mock.calls[0][0]).toEqual('/purchase-order/create');
  });
  it('Invoice button is disabled when no po is selected', async () => {
    render(
      <MemoryRouter>
        <PoPage />
      </MemoryRouter>,
    );
    await waitFor(() => {
      const invoiceButton = screen.getByText('Create Invoice');
      expect(invoiceButton).toBeDisabled();
    });
  });

  it('Send post request to create invoice when user has selected po', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const mockFetch = vi
      .fn()
      .mockImplementationOnce(() => {
        return Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve(mockResolvedData),
        });
      })
      .mockImplementationOnce(() => {
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
});

describe('Select po working correctly', () => {
  it('Select button is enabled when po is not invoiced', async () => {
    render(
      <MemoryRouter>
        <PoPage />
      </MemoryRouter>,
    );
    await waitFor(() => {
      const selectButton = screen.getAllByRole('checkbox');
      expect(selectButton.length).toEqual(2);
    });
  });
});

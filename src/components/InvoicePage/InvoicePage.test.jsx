import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { invoiceData as mockInvoice } from '../../utils/mockData';
import InvoicePage from './InvoicePage';
import InvoiceCard from '../InvoiceCard/InvoiceCard';

const API_URL = import.meta.env.VITE_API_URL;

vi.mock('../InvoiceCard/InvoiceCard', () => ({
  default: ({ invoice }) => {
    return (
      <div>
        <h3>Inv-{invoice.invoiceNumber}</h3>
        <h3>{invoice.customerName}</h3>
      </div>
    );
  },
}));

let mockFetch;

beforeEach(() => {
  mockFetch = vi.fn(() => {
    return Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mockInvoice),
    });
  });
  globalThis.fetch = mockFetch;
});

describe('Render Invoice Page correctly', () => {
  it('Render Invoice page', async () => {
    render(
      <MemoryRouter>
        <InvoicePage />
      </MemoryRouter>,
    );
    const newInvoiceButton = screen.getByRole('button', {
      name: /\bbuat invoice\b/i,
    });

    expect(newInvoiceButton).toBeInTheDocument();

    await waitFor(() => {
      const invoiceCards = screen.getAllByText(/INV-\d{4}/i, { exact: false });
      expect(invoiceCards.length).toEqual(mockInvoice.length);
    });
  });
});

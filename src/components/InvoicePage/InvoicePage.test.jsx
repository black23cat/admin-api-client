import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
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
    const filterForm = screen.getByRole('form', { name: 'Filter Invoice' });

    expect(newInvoiceButton).toBeInTheDocument();
    expect(filterForm).toBeInTheDocument();

    await waitFor(() => {
      const invoiceCards = screen.getAllByText(/INV-\d{4}/i, { exact: false });
      expect(invoiceCards.length).toEqual(mockInvoice.length);
    });
  });
});

describe('Filter form working correctly', () => {
  it('Send request to server with filtered data', async () => {
    const user = userEvent.setup();
    const returnedInvoice = mockInvoice.filter((invoice) =>
      invoice.customerName.includes('John'),
    );
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(returnedInvoice),
      }),
    );

    globalThis.fetch = mockFetch;

    render(
      <MemoryRouter>
        <InvoicePage />
      </MemoryRouter>,
    );
    const searchBar = screen.getByRole('searchbox');
    const filterSubmit = screen.getByRole('button', { name: 'Apply' });
    await user.type(searchBar, mockInvoice[0].customerName);

    expect(searchBar).toHaveValue(mockInvoice[0].customerName);

    await user.click(filterSubmit);
    const [url, options] = mockFetch.mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.query).toEqual(mockInvoice[0].customerName);
    expect(body.sort).toEqual('invoice');
    expect(url).toContain(API_URL);

    await waitFor(
      () => {
        const invoiceCard = screen.getAllByText(mockInvoice[0].customerName);
        expect(invoiceCard.length).toEqual(2);
      },
      { timeout: 1500 },
    );
  });
});

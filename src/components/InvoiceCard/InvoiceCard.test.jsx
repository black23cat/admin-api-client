import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { format } from 'date-fns';
import { invoiceData as mockInvoice } from '../../utils/mockData';
import InvoiceCard from './InvoiceCard';

const currentDate = new Date();

describe('Render Card', () => {
  it('Render Invoice card component correctly', () => {
    render(
      <MemoryRouter>
        <InvoiceCard invoice={mockInvoice[0]} />
      </MemoryRouter>,
    );
    const invoiceNumber = screen.getByText(mockInvoice[0].invoiceNumber, {
      exact: false,
    });
    const customerName = screen.getByText(mockInvoice[0].customerName);
    const customerPhone = screen.getByText(mockInvoice[0].customerPhone);
    const createdAt = screen.getByText(format(currentDate, 'dd-MMM-yyyy'));

    const ammount = screen.getByText('Rp', { exact: false });
    const status = screen.getByText(mockInvoice[0].status);
    const payInvoice = screen.getByText('Bayar Invoice');
    const printInvoice = screen.getByAltText('Print Invoice');
    const deleteInvoice = screen.getByAltText('Delete Invoice');
    expect(invoiceNumber).toBeInTheDocument();
    expect(customerName).toBeInTheDocument();
    expect(customerPhone).toBeInTheDocument();
    expect(createdAt).toBeInTheDocument();
    expect(ammount).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(payInvoice).toBeInTheDocument();
    expect(printInvoice).toBeInTheDocument();
    expect(deleteInvoice).toBeInTheDocument();
  });
});

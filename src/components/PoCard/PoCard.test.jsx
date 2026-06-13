import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { format } from 'date-fns';
import PoCard from './PoCard';
import Dialog from '../Dialog/Dialog';
import { mockPoData } from '../../utils/mockData';

const mockPurchaseOrder = mockPoData[0];
vi.mock('../Dialog/Dialog', () => {
  return {
    default: () => <div>Modal mock</div>,
  };
});

describe('Render Card', () => {
  it('Render Card correctly', () => {
    const currentDate = format(new Date(), 'dd-MMM-yyyy');
    render(
      <MemoryRouter>
        <PoCard purchaseOrder={mockPurchaseOrder} />
      </MemoryRouter>,
    );
    const customerName = screen.getByText('John Doe');
    const dateCreated = screen.getByText(`${currentDate}`);
    expect(customerName).toBeInTheDocument();
    expect(dateCreated).toBeInTheDocument();
  });

  it("Shouldn't Render form, file list and action button when card isOpen=false", async () => {
    render(
      <MemoryRouter>
        <PoCard purchaseOrder={mockPurchaseOrder} isOpen={false} />
      </MemoryRouter>,
    );

    expect(() => screen.getByTestId('purchase-order-form')).toThrow();
    expect(() => screen.getByAltText('delete purchase order')).toThrow();
    expect(() => screen.getByAltText('print purchase order')).toThrow();
  });

  it('Render form, file list and action button when card isOpen=true', async () => {
    render(
      <MemoryRouter>
        <PoCard purchaseOrder={mockPurchaseOrder} isOpen={true} />
      </MemoryRouter>,
    );
    const poForm = screen.getByTestId('purchase-order-form');
    const deleteButton = screen.getByAltText('delete purchase order');
    const printButton = screen.getByAltText('print purchase order');

    expect(poForm).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(printButton).toBeInTheDocument();
  });
});

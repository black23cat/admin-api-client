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
    const selectPo = screen.getByRole('checkbox');
    expect(customerName).toBeInTheDocument();
    expect(dateCreated).toBeInTheDocument();
    expect(selectPo).toBeInTheDocument();
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
    const deleteButton = screen.getByTestId('delete-po');
    const printButton = screen.getByTestId('print-po');

    expect(poForm).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(printButton).toBeInTheDocument();
  });

  it('Select button is disabled when po is invoiced', async () => {
    const poData = mockPoData.map((po) => {
      return { ...po, invoiceId: 1 };
    });
    globalThis.fetch = vi.fn(() => {
      return Promise.resolve({
        status: 200,
        ok: true,
        json: () =>
          Promise.resolve({ purchaseOrder: poData, count: poData.length }),
      });
    });
    render(
      <MemoryRouter>
        <PoCard purchaseOrder={poData[0]} />
      </MemoryRouter>,
    );

    const selectButton = screen.getByRole('checkbox');
    expect(selectButton).toBeDisabled();
  });
});

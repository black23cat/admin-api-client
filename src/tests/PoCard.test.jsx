import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { format } from 'date-fns';
import PoCard from '../components/PoCard/PoCard';
import userEvent from '@testing-library/user-event';
import { mockPoData } from '../utils/mockData';

const mockPurchaseOrder = mockPoData[0];

describe('Render Card', () => {
  it('Render Card correctly', () => {
    const currentDate = format(new Date(), 'MM-dd-yyyy');
    render(
      <MemoryRouter>
        <PoCard purchaseOrder={mockPurchaseOrder} />
      </MemoryRouter>,
    );
    const customerName = screen.getByText('John Doe');
    const dateCreated = screen.getByText(`${currentDate}`);
    const editButton = screen.getByAltText('edit purchase order');
    const deleteButton = screen.getByAltText('delete purchase order');
    const printPo = screen.getByAltText('print purchase order');
    const selectPo = screen.getByTestId('select-button');
    expect(customerName).toBeInTheDocument();
    expect(dateCreated).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(printPo).toBeInTheDocument();
    expect(selectPo).toBeInTheDocument();
  });

  it('Select button is enabled when po is not invoiced', async () => {
    render(
      <MemoryRouter>
        <PoCard purchaseOrder={mockPurchaseOrder} />
      </MemoryRouter>,
    );
    const selectButton = screen.getByTestId('select-button');
    expect(selectButton).not.toBeDisabled();
  });

  it('Select button is disabled when po is invoiced', async () => {
    render(
      <MemoryRouter>
        <PoCard purchaseOrder={{ ...mockPurchaseOrder, invoiceId: 1 }} />
      </MemoryRouter>,
    );
    const selectButton = screen.getByTestId('select-button');
    expect(selectButton).toBeDisabled();
  });

  it('Render file list when card is active', async () => {
    render(
      <MemoryRouter>
        <PoCard purchaseOrder={mockPurchaseOrder} expandCard={true} />
      </MemoryRouter>,
    );
    const fileList = screen.getAllByText('Test print', { exact: false });
    expect(fileList.length).toEqual(3);
  });

  it("Shouldn't Render file list when card is not active", async () => {
    render(
      <MemoryRouter>
        <PoCard purchaseOrder={mockPurchaseOrder} />
      </MemoryRouter>,
    );
    const fileList = screen.queryAllByText('Test print', { exact: false });
    expect(fileList.length).toEqual(0);
  });

  it('Render po edit form when edit button is clicked', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <MemoryRouter>
        <PoCard purchaseOrder={mockPurchaseOrder} expandCard={true} />
      </MemoryRouter>,
    );
    const editButton = screen.getByAltText('edit purchase order');
    await user.click(editButton);

    const editPoForm = screen.getByTestId('edit-po-form');
    expect(editPoForm).toBeInTheDocument();
  });
});

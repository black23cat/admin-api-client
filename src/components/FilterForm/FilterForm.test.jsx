import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { invoiceData as mockInvoice } from '../../utils/mockData';
import FilterForm from './FilterForm';
import { format } from 'date-fns';

let onSubmit;
beforeEach(() => {
  onSubmit = vi.fn();
});

describe('Filter Form correctly', () => {
  it('Render Form', async () => {
    const user = userEvent.setup();
    render(<FilterForm handleFilterSubmit={onSubmit} />);

    const searchBar = screen.getByRole('searchbox');
    const filterSelect = screen.getByLabelText('Sort By :');
    const applyFilterButton = screen.getByRole('button', { name: 'Apply' });

    await user.click(filterSelect);

    const invoiceNumberFilter = screen.getByRole('option', { name: 'Invoice' });
    const dateFilter = screen.getByRole('option', { name: 'Tanggal' });
    const amountFilter = screen.getByRole('option', { name: 'Jumlah' });
    const statusFilter = screen.getByRole('option', { name: 'Status' });
    const weekFilter = screen.getByLabelText('Minggu :');

    expect(searchBar).toBeInTheDocument();
    expect(filterSelect).toBeInTheDocument();
    expect(invoiceNumberFilter).toBeInTheDocument();
    expect(dateFilter).toBeInTheDocument();
    expect(amountFilter).toBeInTheDocument();
    expect(statusFilter).toBeInTheDocument();
    expect(weekFilter).toBeInTheDocument();
    expect(applyFilterButton).toBeInTheDocument();
  });
});

describe('Filter form working correctly', () => {
  it('Send form data to parent element', async () => {
    const user = userEvent.setup();

    render(<FilterForm handleFilterSubmit={onSubmit} />);
    const searchBar = screen.getByRole('searchbox');
    const filterSubmit = screen.getByRole('button', { name: 'Apply' });
    await user.type(searchBar, mockInvoice[0].customerName);

    expect(searchBar).toHaveValue(mockInvoice[0].customerName);

    await user.click(filterSubmit);
    const { query, sortBy, date } = onSubmit.mock.calls[0][0];
    expect(query).toEqual(mockInvoice[0].customerName);
    expect(sortBy).toEqual('invoice');
    expect(date).toEqual(format(new Date(), 'yyyy-MM-dd'));
  });
});

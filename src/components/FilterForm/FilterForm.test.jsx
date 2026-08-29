import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { invoiceData as mockInvoice } from '../../utils/mockData';
import FilterForm from './FilterForm';
import { UserScreenData } from '../../App';

let onSubmit;
let userScreen;
beforeEach(() => {
  onSubmit = vi.fn();

  userScreen = [
    {
      width: 500,
      height: 600,
    },
  ];
});

describe('Filter Form render correctly', () => {
  it('Render Form', async () => {
    const user = userEvent.setup();
    render(
      <UserScreenData value={userScreen}>
        <FilterForm handleFilterButtonClick={onSubmit} type="invoice" />
      </UserScreenData>,
    );

    const toggleFilterFormButton = screen.getByRole('button', {
      name: 'Filter Data',
    });

    await user.click(toggleFilterFormButton);

    const searchBar = screen.queryByRole('searchbox');
    const filterSelect = screen.queryByLabelText('Urutkan :');
    const applyFilterButton = screen.queryByRole('button', { name: 'Apply' });
    await user.click(filterSelect);

    const invoiceNumberFilter = screen.getByRole('option', {
      name: '🧾 Invoice',
    });
    const dateFilter = screen.getByRole('option', { name: '📅 Tanggal' });
    const statusFilter = screen.getByRole('option', { name: '⌛ Status' });
    const dateStartInput = screen.getByLabelText('Tanggal Awal');
    const dateEndInput = screen.getByLabelText('Tanggal Akhir');

    expect(searchBar).toBeInTheDocument();
    expect(filterSelect).toBeInTheDocument();
    expect(invoiceNumberFilter).toBeInTheDocument();
    expect(dateFilter).toBeInTheDocument();
    expect(statusFilter).toBeInTheDocument();
    expect(dateStartInput).toBeInTheDocument();
    expect(dateEndInput).toBeInTheDocument();
    expect(applyFilterButton).toBeInTheDocument();
  });
});

describe('Filter form working correctly', () => {
  it('Send form data to parent element', async () => {
    const user = userEvent.setup();

    render(
      <UserScreenData value={userScreen}>
        <FilterForm handleFilterButtonClick={onSubmit} type="invoice" />
      </UserScreenData>,
    );
    const toggleFilterFormButton = screen.getByRole('button', {
      name: 'Filter Data',
    });

    await user.click(toggleFilterFormButton);

    const searchBar = screen.getByRole('searchbox');
    const filterSubmit = screen.getByRole('button', { name: 'Apply' });
    await user.type(searchBar, mockInvoice[0].customerName);

    expect(searchBar).toHaveValue(mockInvoice[0].customerName);

    await user.click(filterSubmit);
    const { query, sortBy, dateStart } = onSubmit.mock.calls[0][0];
    expect(query).toEqual(mockInvoice[0].customerName);
    expect(sortBy).toEqual('invoiceNumber');
    expect(dateStart).toEqual('');
  });
});

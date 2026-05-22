import { useEffect, useState } from 'react';
import { invoiceData } from '../../utils/mockData';
import InvoiceCard from '../InvoiceCard/InvoiceCard';
import { format } from 'date-fns';

const todayDate = new Date();
const API_URL = import.meta.env.VITE_API_URL;

export default function InvoicePage() {
  const [invoiceList, setInvoiceList] = useState([]);
  const [searchBox, setSearchBox] = useState('');
  const [selectedValue, setSelectedValue] = useState('invoice');
  const [error, setError] = useState(false);

  useEffect(() => {
    // FETCH DUMMY
    // TODO: Replace timeout with fetch call
    const timeout = setTimeout(() => {
      setInvoiceList(invoiceData);
    }, 300);
    return () => clearTimeout(timeout);
  });

  const handleSearchChange = (e) => {
    setSearchBox(e.target.value);
  };
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchBox, sort: selectedValue }),
      });
      if (response.status !== 200) {
        throw new Error('Server Error');
      }
      const result = response.json();
      setInvoiceList(result);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {error !== '' && <span>{error}</span>}
      <button>(+) Buat Invoice</button>
      <form onSubmit={handleSearchSubmit}>
        <div>
          <label htmlFor="search-invoice">Search :</label>
          <input
            type="search"
            name="search-invoice"
            id="search-invoice"
            placeholder="Search Invoice..."
            value={searchBox}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <label htmlFor="filter">Filter :</label>
          <select
            name="filter"
            id="filter"
            onChange={handleSelectChange}
            value={selectedValue}
          >
            <option value="invoice">Invoice</option>
            <option value="date">Tanggal</option>
            <option value="amount">Jumlah</option>
            <option value="status">Status</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Minggu :</label>
          <input type="date" id="date" max={format(todayDate, 'yyyy-mm-dd')} />
        </div>
        <button type="submit">Apply</button>
      </form>
      <div className="invoice-card-wrapper">
        {invoiceList.length > 0 &&
          invoiceList.map((invoice) => {
            return <InvoiceCard key={invoice.id} invoice={invoice} />;
          })}
      </div>
    </>
  );
}

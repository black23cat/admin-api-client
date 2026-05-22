import { useEffect, useState } from 'react';
import { invoiceData } from '../../utils/mockData';
import InvoiceCard from '../InvoiceCard/InvoiceCard';
import FilterForm from '../FilterForm/FilterForm';

const API_URL = import.meta.env.VITE_API_URL;

export default function InvoicePage() {
  const [invoiceList, setInvoiceList] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // FETCH DUMMY
    // TODO: Replace timeout with fetch call
    const timeout = setTimeout(() => {
      setInvoiceList(invoiceData);
    }, 300);
    return () => clearTimeout(timeout);
  });

  const handleFilterSubmit = async (formData) => {
    try {
      const query = formData.query;
      const sortBy = formData.sortBy;
      const date = formData.date;

      const response = await fetch(`${API_URL}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query, sort: sortBy, date: date }),
      });
      if (response.status !== 200) {
        throw new Error('Server Error');
      }
      const result = response.json();
      setInvoiceList(result);
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <button>(+) Buat Invoice</button>
      {error && <span>Gagal memfilter invoice</span>}
      <FilterForm handleFilterSubmit={handleFilterSubmit} />
      <div className="invoice-card-wrapper">
        {invoiceList.length > 0 &&
          invoiceList.map((invoice) => {
            return <InvoiceCard key={invoice.id} invoice={invoice} />;
          })}
      </div>
    </>
  );
}

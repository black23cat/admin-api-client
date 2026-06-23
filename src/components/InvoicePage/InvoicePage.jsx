import { useEffect, useState } from 'react';
import InvoiceCard from '../InvoiceCard/InvoiceCard';
import FilterForm from '../FilterForm/FilterForm';

const API_URL = import.meta.env.VITE_API_URL;

export default function InvoicePage() {
  const [invoiceList, setInvoiceList] = useState([]);
  const [fetchInvoiceError, setFetchInvoiceError] = useState(false);

  const updateInvoice = (invoiceData) => {
    const updatedList = invoiceList.map((invoice) => {
      return invoice.id === invoiceData.id ? invoiceData : invoice;
    });
    return setInvoiceList(updatedList);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/invoice`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          const result = await response.json();
          setInvoiceList(result);
        }
      } catch {
        setFetchInvoiceError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <button>(+) Buat Invoice</button>
      {fetchInvoiceError && <span>Gagal mengambil invoice</span>}
      <div className="invoice-card-wrapper">
        {invoiceList.length > 0 ? (
          invoiceList.map((invoice) => {
            return (
              <InvoiceCard
                key={invoice.id}
                invoice={invoice}
                updateInvoice={updateInvoice}
              />
            );
          })
        ) : (
          <span>Belum ada data invoice</span>
        )}
      </div>
    </>
  );
}

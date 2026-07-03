import { useEffect, useState } from 'react';
import InvoiceCard from '../InvoiceCard/InvoiceCard';
import FilterForm from '../FilterForm/FilterForm';
import { useSearchParams } from 'react-router';
import PageNavigation from '../PageNavigation/PageNavigation';

const API_URL = import.meta.env.VITE_API_URL;
const initialFilterParams = 'page=1&filter=0';

export default function InvoicePage() {
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceCount, setInvoiceCount] = useState(null);
  const [fetchInvoiceError, setFetchInvoiceError] = useState(false);
  const [filterParams, setFilterParams] = useSearchParams(initialFilterParams);

  const currentPage = Number(filterParams.get('page'));

  const updateInvoice = (invoiceData) => {
    const updatedList = invoiceList.map((invoice) => {
      return invoice.id === invoiceData.id ? invoiceData : invoice;
    });
    return setInvoiceList(updatedList);
  };

  const handleFilterButtonClick = (filterData, reset = false) => {
    if (reset) {
      setFilterParams(initialFilterParams);
      return;
    }

    const newUrlParams = { page: '1', filter: '1', ...filterData };
    setFilterParams(newUrlParams);
  };

  const handlePageNavigation = (navigate) => {
    if (navigate === 'prev') {
      return setFilterParams((prev) => {
        prev.set('page', currentPage - 1);
        return prev;
      });
    } else if (navigate === 'next') {
      return setFilterParams((prev) => {
        prev.set('page', currentPage + 1);
        return prev;
      });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async (filterParams = null) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `${API_URL}/invoice?${filterParams === null ? initialFilterParams : filterParams}`,
          {
            signal: abortController.signal,
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.status === 200) {
          const result = await response.json();
          setInvoiceCount(result.count);
          setInvoiceList(result.invoiceList);
        }
      } catch (err) {
        if (err.name === 'AbortError' || abortController.signal.aborted) {
          return;
        }
        setFetchInvoiceError(true);
      }
    };
    fetchData(filterParams);
    return () => abortController.abort();
  }, [filterParams]);

  useEffect(() => {
    if (!fetchInvoiceError) {
      return;
    }
    const timeout = setTimeout(() => {
      setFetchInvoiceError(false);
    }, 500);

    return () => clearTimeout(timeout);
  });

  return (
    <>
      <button>(+) Buat Invoice</button>
      <FilterForm
        handleFilterButtonClick={handleFilterButtonClick}
        type="invoice"
      />
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
      <PageNavigation
        totalItemCount={invoiceCount}
        currentPage={currentPage}
        handlePageNavigation={handlePageNavigation}
      />
    </>
  );
}

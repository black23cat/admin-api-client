import PoCard from '../PoCard/PoCard';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import Dialog from '../Dialog/Dialog';
import InvoiceConfirmForm from '../InvoiceConfirmForm/InvoiceConfirmForm';
import FilterForm from '../FilterForm/FilterForm';
import PageNavigation from '../PageNavigation/PageNavigation';
import styles from './PoPage.module.css';
import InvoiceCreated from '../InvoiceCreated/InvoiceCreated';

const API_URL = import.meta.env.VITE_API_URL;
const initialFilterParams = 'page=1&filter=0';

export default function PoPage() {
  const [selectedPoId, setSelectedPoId] = useState([]);
  const [poList, setPoList] = useState([]);
  const [poCount, setPoCount] = useState(null);
  const [editCardId, setEditCardId] = useState(null);
  const [fetchPoError, setFetchPoError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newInvoiceResult, setNewInvoiceResult] = useState(null);
  const [invoiceCreated, setInvoiceCreated] = useState(false);
  const [invoiceErrorMsg, setInvoiceErrorMsg] = useState('');
  const [filterParams, setFilterParams] = useSearchParams(initialFilterParams);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Define total items to displayed on page
  // Calculte current user displayed page
  const currentPage = Number(filterParams.get('page'));

  const navigate = useNavigate();

  const handleSelectPo = (poId) => {
    if (selectedPoId.includes(poId)) {
      const index = selectedPoId.indexOf(poId);
      const lists = [...selectedPoId];
      lists.splice(index, 1);
      setSelectedPoId(lists);
    } else {
      setSelectedPoId([...selectedPoId, poId]);
    }
  };

  const handleCardEdit = (poId) => {
    if (poId === editCardId) {
      return;
    }
    setEditCardId(poId);
  };

  const handleCloseCard = () => {
    setEditCardId(null);
  };

  const updatePo = (poData, action = 'edit') => {
    if (action === 'edit') {
      const updatedPo = poList.map((po) => (po.id === poData.id ? poData : po));
      setPoList(updatedPo);
      return;
    }
    if (action === 'delete') {
      const deletedPo = poList.filter((po) => po.id !== poData.id);
      setPoList(deletedPo);
      return;
    }
    throw 'No actions were defined';
  };

  const invoiceConfirmSubmit = (e, printDetails) => {
    e.preventDefault();
    if (printDetails.customerName === '') {
      printDetails.customerName = newInvoiceResult.customerName;
    }
    createInvoice(true, printDetails);
    return;
  };

  const invoiceCancelButton = () => {
    closeModal();
    setNewInvoiceResult(null);
    return;
  };

  const closeModal = () => {
    setShowModal(false);
    return;
  };

  const createInvoice = async (allowMissmatch = false, printDetails = null) => {
    // Check for selected po
    if (selectedPoId.length === 0) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const bodyRequest = {
        selectedIds: selectedPoId,
        allowMissmatch: allowMissmatch,
      };

      if (allowMissmatch && printDetails !== null) {
        bodyRequest.printDetails = printDetails;
      }

      const response = await fetch(`${API_URL}/invoice/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...bodyRequest }),
      });

      if (response.ok) {
        const { invoice, updatedPoId } = await response.json();
        setSelectedPoId([]);
        setInvoiceErrorMsg('');
        setInvoiceCreated(true);
        const updatedPoList = poList.map((list) => {
          return updatedPoId.includes(list.id)
            ? { ...list, invoiceId: invoice.id }
            : list;
        });
        setPoList(updatedPoList);

        return;
      }

      if (response.status !== 422) {
        return setInvoiceErrorMsg('Gagal membuat invoice');
      }

      const result = await response.json();
      setNewInvoiceResult(result);
      setShowModal(true);
    } catch {
      setInvoiceErrorMsg('Gagal membuat invoice');
    }
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
    const token = localStorage.getItem('token');
    const fetchErrorMessage = 'Gagal mengambil data po dari server';
    const abortController = new AbortController();
    const fetchPoData = async (filterParams) => {
      try {
        const response = await fetch(
          `${API_URL}/purchase-order?${
            filterParams === null ? initialFilterParams : filterParams
          }`,
          {
            signal: abortController.signal,
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.status !== 200 || !response.ok) {
          throw fetchErrorMessage;
        }
        const result = await response.json();

        setPoCount(result.count);
        setPoList(result.purchaseOrder);
        setFetchLoading(false);
      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        }
        setFetchPoError(true);
        setFetchLoading(false);
      }
    };
    fetchPoData(filterParams);
    return () => abortController.abort();
  }, [filterParams]);

  useEffect(() => {
    if (invoiceErrorMsg === '') {
      return;
    }
    const timeout = setTimeout(() => {
      setInvoiceErrorMsg('');
    }, 2000);
    return () => clearTimeout(timeout);
  });

  return (
    <main>
      {' '}
      <Dialog isOpen={showModal} closeModal={closeModal}>
        {invoiceCreated ? (
          <InvoiceCreated closeModal={invoiceCancelButton} />
        ) : (
          <>
            {newInvoiceResult !== null && (
              <InvoiceConfirmForm
                data={newInvoiceResult}
                handleSubmit={invoiceConfirmSubmit}
                handleCancel={invoiceCancelButton}
              />
            )}
          </>
        )}
      </Dialog>
      <div>
        <h3>Purchase Order</h3>
        <button
          className={styles['new-po']}
          onClick={() => navigate('/purchase-order/create')}
        >
          + New Purchase Order
        </button>
        <FilterForm handleFilterButtonClick={handleFilterButtonClick} />
        <div className={styles['po-list-wrapper']}>
          <div className={styles['card-header']}>
            <h3>Id Po</h3>
            <h3>Nama Customer</h3>
            <h3>Tanggal</h3>
          </div>

          {poList.length > 0 ? (
            <>
              {poList.map((po) => {
                return (
                  <PoCard
                    key={po.id}
                    purchaseOrder={po}
                    handleCardClick={handleCardEdit}
                    isOpen={po.id === editCardId}
                    closeCardForm={handleCloseCard}
                    updatePo={updatePo}
                    handleSelectPo={handleSelectPo}
                    selected={selectedPoId.includes(po.id)}
                  />
                );
              })}
            </>
          ) : fetchLoading && poList.length === 0 ? (
            <p className={styles.loading}>Mengambil data dari server...</p>
          ) : poList.length === 0 && fetchPoError ? (
            <p className={styles['fetch-error']}>
              Gagal mengambil data po dari server
            </p>
          ) : (
            <p className={styles['no-data']}>Tidak ada data po</p>
          )}
        </div>
        <button
          className={styles['new-invoice']}
          onClick={() => createInvoice(false)}
          disabled={selectedPoId.length === 0 ? true : false}
        >
          Create Invoice
        </button>
        {invoiceErrorMsg !== '' && <p>{invoiceErrorMsg}</p>}
      </div>
      <PageNavigation
        totalItemCount={poCount}
        currentPage={currentPage}
        handlePageNavigation={handlePageNavigation}
      />
    </main>
  );
}

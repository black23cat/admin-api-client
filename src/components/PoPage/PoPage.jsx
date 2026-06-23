import PoCard from '../PoCard/PoCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Dialog from '../Dialog/Dialog';
import InvoiceConfirmForm from '../InvoiceConfirmForm/InvoiceConfirmForm';

const API_URL = import.meta.env.VITE_API_URL;

export default function PoPage() {
  const [selectedPoId, setSelectedPoId] = useState([]);
  const [poList, setPoList] = useState([]);
  const [editCardId, setEditCardId] = useState(null);
  const [fetchPoError, setFetchPoError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newInvoiceResult, setNewInvoiceResult] = useState(null);
  const [invoiceCreated, setInvoiceCreated] = useState(false);
  const [invoiceErrorMsg, setInvoiceErrorMsg] = useState('');
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

      if (response.status === 422) {
        const result = await response.json();
        setNewInvoiceResult(result);
        return setShowModal(true);
      }
    } catch {
      setInvoiceErrorMsg('Gagal membuat invoice');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchErrorMessage = 'Gagal mengambil data po dari server';
    const fetchPoData = async () => {
      try {
        const response = await fetch(`${API_URL}/purchase-order`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status !== 200) {
          throw fetchErrorMessage;
        }
        const result = await response.json();
        setPoList(result);
      } catch {
        setFetchPoError(fetchErrorMessage);
      }
    };
    fetchPoData();
  }, []);

  return (
    <>
      {' '}
      <Dialog isOpen={showModal} closeModal={closeModal}>
        {invoiceCreated ? (
          <>
            <h3>Berhasil membuat invoice</h3>
            <button type="button" onClick={invoiceCancelButton}>
              Tutup
            </button>
          </>
        ) : (
          <>
            <h3>Konfirmasi pembuatan invoice</h3>
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
        <h2>Purchase Order</h2>
        <button onClick={() => navigate('/purchase-order/create')}>
          + New Purchase Order
        </button>
        {poList.length > 0 ? (
          <div className="po-list-wrapper">
            {poList.map((po) => (
              <div
                className="card-wrapper"
                key={po.id}
                style={{ border: '1px solid green' }}
              >
                <input
                  type="checkbox"
                  name="selectPo"
                  id="selectPo"
                  aria-label="select po"
                  onChange={() => handleSelectPo(po.id)}
                  checked={selectedPoId.includes(po.id)}
                  disabled={po.invoiceId !== null ? true : false}
                />
                <PoCard
                  purchaseOrder={po}
                  handleCardClick={handleCardEdit}
                  isOpen={po.id === editCardId}
                  closeCardForm={handleCloseCard}
                  updatePo={updatePo}
                />
              </div>
            ))}
          </div>
        ) : poList.length === 0 && fetchPoError === '' ? (
          <span>Loading</span>
        ) : (
          <span>{fetchPoError}</span>
        )}
        <button
          onClick={() => createInvoice(false)}
          disabled={selectedPoId.length === 0 ? true : false}
        >
          Create Invoice
        </button>
        {invoiceErrorMsg !== '' ? <span>{invoiceErrorMsg}</span> : ''}
      </div>
    </>
  );
}

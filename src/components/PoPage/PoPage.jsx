import PoCard from '../PoCard/PoCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL;

export default function PoPage() {
  const [selectedPo, setSelectedPo] = useState([]);
  const [poList, setPoList] = useState([]);
  const [editCardId, setEditCardId] = useState(null);
  const [invoiceError, setInvoiceError] = useState(false);
  const [fetchPoError, setFetchPoError] = useState('');
  const navigate = useNavigate();

  const handleSelectPo = (poId) => {
    if (selectedPo.includes(poId)) {
      const index = selectedPo.indexOf(poId);
      const lists = [...selectedPo];
      lists.splice(index, 1);
      setSelectedPo(lists);
    } else {
      setSelectedPo([...selectedPo, poId]);
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

  const createInvoice = async () => {
    // Check for selected po
    if (selectedPo.length === 0) {
      return;
    }
    try {
      const response = fetch(`${API_URL}/purchase-order/create`, {
        method: 'POST',
      });
      const result = await response.json();
      if (response.status !== 201) {
        throw new Error('Server Error');
      }
      const list = poList.map((list) =>
        selectedPo.includes(list.id) ? { ...list, invoiceId: result.id } : list,
      );
      setPoList(list);
      setSelectedPo([]);
    } catch {
      setInvoiceError(true);
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

  useEffect(() => {
    if (!invoiceError) {
      return;
    }
    const errorTimeout = setTimeout(() => {
      setInvoiceError(false);
    }, 1000);
    return () => clearTimeout(errorTimeout);
  });

  return (
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
              <label htmlFor="selectPo">
                <input
                  type="checkbox"
                  name="selectPo"
                  id="selectPo"
                  aria-label="select po"
                  onChange={() => handleSelectPo(po.id)}
                  checked={selectedPo.includes(po.id)}
                  disabled={po.invoiceId !== null ? true : false}
                />
              </label>
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
        onClick={createInvoice}
        disabled={selectedPo.length === 0 ? true : false}
      >
        Create Invoice
      </button>
      {invoiceError ? <span>Gagal membuat invoice</span> : ''}
    </div>
  );
}

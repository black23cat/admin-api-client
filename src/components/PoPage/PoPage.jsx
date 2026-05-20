import PoCard from '../PoCard/PoCard';
import { useEffect, useState } from 'react';
import { mockPoData } from '../../utils/mockData';

export default function PoPage() {
  const [selectedPo, setSelectedPo] = useState([]);
  const [poList, setPoList] = useState([]);
  const [error, setError] = useState(false);

  const handleChange = (poId) => {
    if (selectedPo.includes(poId)) {
      const index = selectedPo.indexOf(poId);
      const lists = [...selectedPo];
      lists.splice(index, 1);
      setSelectedPo(lists);
    } else {
      setSelectedPo([...selectedPo, poId]);
    }
  };

  const createInvoice = async () => {
    // Check for selected po
    if (selectedPo.length === 0) {
      return;
    }
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = fetch(`${API_URL}/api/`, {
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
      setError(true);
    }
  };

  useEffect(() => {
    // TODO : Replace with fetch data from API
    const timeout = setTimeout(() => {
      setPoList(mockPoData);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }
    const errorTimeout = setTimeout(() => {
      setError(false);
    }, 1000);
    return () => clearTimeout(errorTimeout);
  });

  return (
    <div>
      <h2>Purchase Order</h2>
      <button>+ New Purchase Order</button>
      {poList.length > 0 ? (
        <div className="po-list-wrapper">
          {mockPoData.map((po) => (
            <div key={po.id}>
              <label htmlFor="selectedPo">
                <input
                  type="checkbox"
                  name="selectPo"
                  id="selectPo"
                  onChange={() => handleChange(po.id)}
                  checked={
                    selectedPo.includes(po.id) || po.invoiceId !== null
                      ? true
                      : false
                  }
                  disabled={po.invoiceId !== null ? true : false}
                />
              </label>
              <PoCard po={po} />
            </div>
          ))}
        </div>
      ) : (
        <span>Loading</span>
      )}
      <button
        onClick={createInvoice}
        disabled={selectedPo.length === 0 ? true : false}
      >
        Create Invoice
      </button>
      {error ? <span>Gagal membuat invoice</span> : ''}
    </div>
  );
}

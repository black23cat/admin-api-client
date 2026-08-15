import { format } from 'date-fns';
import PoForm from '../PoForm/PoForm';
import Dialog from '../Dialog/Dialog';
import { useState } from 'react';
import styles from './PoCard.module.css';

export default function PoCard({
  purchaseOrder,
  handleCardClick,
  isOpen,
  closeCardForm,
  updatePo,
  // selected,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const closeModal = () => {
    setOpenModal(false);
  };

  const deletePo = () => {
    setOpenModal(true);
  };

  const handleModalBtnClick = (action) => {
    if (action === 'cancel') {
      closeModal();
      return;
    }
    const token = localStorage.getItem('token');
    if (token === null) {
      setErrorMsg('Token expired silahkan login ulang.');
      closeModal();
      return;
    }

    if (purchaseOrder.invoiceId !== null) {
      setErrorMsg('Po ini sudah dibuat invoice');
      return;
    }

    if (action === 'confirm' && token !== null) {
      const errorMsg = 'Gagal menghapus Purchase Order';
      const fetchDelete = async () => {
        try {
          const API_URL = import.meta.env.VITE_API_URL;
          const response = await fetch(
            `${API_URL}/purchase-order/${purchaseOrder.id}`,
            { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } },
          );
          if (response.status !== 200) {
            throw errorMsg;
          }
          if (response.status === 200) {
            const result = await response.json();
            updatePo(result, 'delete');
            return;
          }
        } catch {
          setErrorMsg(errorMsg);
        }
      };
      fetchDelete();
    }
  };

  return (
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={() => handleCardClick(purchaseOrder.id)}
    >
      <Dialog isOpen={openModal} closeModal={closeModal}>
        <h3>Hapus Purchase Order</h3>
        <div>
          <button onClick={() => handleModalBtnClick('confirm')}>Hapus</button>
          <button onClick={() => handleModalBtnClick('cancel')}>Batal</button>
        </div>
      </Dialog>
      <CardDetails purchaseOrder={purchaseOrder} />
      {isOpen && (
        <>
          <PoForm
            poData={purchaseOrder}
            closeCardForm={closeCardForm}
            updatePo={updatePo}
          />
          <CardButton
            poId={purchaseOrder.id}
            deletePo={deletePo}
            disabled={purchaseOrder.invoiceId !== null}
          />
          {errorMsg !== '' && <span>{errorMsg}</span>}
        </>
      )}
    </div>
  );
}

function CardDetails({ purchaseOrder }) {
  return (
    <div className={styles['po-details']}>
      <p>{generatePoId(purchaseOrder)}</p>
      <h3>{purchaseOrder.customerName}</h3>
      <p>{format(purchaseOrder.createdAt, 'dd-MMM-yyyy')}</p>
    </div>
  );
}

function CardButton({ deletePo, disabled }) {
  return (
    <div className="card-button">
      <button>
        <img src="example.com" alt="print purchase order" />
      </button>
      <button onClick={() => deletePo()} disabled={disabled}>
        <img src="example.com" alt="delete purchase order" />
      </button>
    </div>
  );
}

function generatePoId(po) {
  const createdAt = new Date(po.createdAt);
  const poId = po.id;
  const idLength = poId.toString().length;
  const idPrefix = '000000'.slice(0, 6 - idLength);
  return `PO-${createdAt.getFullYear()}${createdAt.getMonth() + 1 < 10 ? '0' : ''}${createdAt.getMonth() + 1}-${idPrefix}${poId}`;
}

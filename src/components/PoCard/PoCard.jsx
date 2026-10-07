import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { format } from 'date-fns';
import generatePoId from '../../utils/generatePoId';
import PoForm from '../PoForm/PoForm';
import Dialog from '../Dialog/Dialog';
import Trasn from '../../assets/svg/Trash';
import Printer from '../../assets/svg/Printer';
import DeletePo from '../DeletePo/DeletePo';
import PoPrint from '../PoPrint/PoPrint';
import Spinner from '../Spinner/Spinner';
import styles from './PoCard.module.css';

export default function PoCard({
  purchaseOrder,
  handleCardClick,
  isOpen,
  closeCardForm,
  updatePo,
  handleSelectPo,
  selected,
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
      className={
        selected && !isOpen ? `${styles.card} ${styles.selected}` : styles.card
      }
    >
      <Dialog isOpen={openModal} closeModal={closeModal}>
        <DeletePo handleModalBtnClick={handleModalBtnClick} />
      </Dialog>
      <input
        type="checkbox"
        name="selectPo"
        id="select-po"
        aria-label="select po"
        onChange={() => handleSelectPo(purchaseOrder.id)}
        checked={selected}
        disabled={purchaseOrder.invoiceId !== null ? true : false}
      />{' '}
      <CardDetails
        handleCardClick={handleCardClick}
        purchaseOrder={purchaseOrder}
      />
      <CardButton
        deletePo={deletePo}
        disabled={purchaseOrder.invoiceId !== null}
        poData={purchaseOrder}
      />
      {isOpen && (
        <>
          <PoForm
            poData={purchaseOrder}
            closeCardForm={closeCardForm}
            updatePo={updatePo}
          />

          {errorMsg !== '' && <span>{errorMsg}</span>}
        </>
      )}
    </div>
  );
}

function CardDetails({ handleCardClick, purchaseOrder }) {
  return (
    <div
      className={styles['card-details']}
      onClick={() => handleCardClick(purchaseOrder.id)}
      role="button"
    >
      <p>{generatePoId(purchaseOrder)}</p>
      <p className={styles['customer-name']}>{purchaseOrder.customerName}</p>
      <p>{format(purchaseOrder.createdAt, 'dd-MMM-yyyy')}</p>
    </div>
  );
}

function CardButton({ deletePo, disabled, poData }) {
  const documentTitle = `${generatePoId(poData)}-${poData.customerName}`;
  return (
    <div className={styles['card-button']}>
      <PDFDownloadLink
        document={<PoPrint poData={poData} title={documentTitle} />}
        fileName={documentTitle}
      >
        {({ loading }) => (loading ? <Spinner size="14px" /> : <Printer />)}
      </PDFDownloadLink>

      <button
        data-testid="delete-po"
        className={styles.delete}
        onClick={() => deletePo()}
        disabled={disabled}
      >
        <Trasn />
      </button>
    </div>
  );
}

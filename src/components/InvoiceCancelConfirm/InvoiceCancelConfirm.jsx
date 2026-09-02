import styles from './InvoiceCancelConfirm.module.css';

export default function InvoiceCancelConfirm({
  handleCancelInvoice,
  closeModal,
}) {
  return (
    <div className={styles['cancel-confirm']}>
      <h3>Ingin membatalkan invoice</h3>
      <div>
        <button type="button" onClick={closeModal}>
          Batal
        </button>
        <button type="button" onClick={() => handleCancelInvoice('confirm')}>
          Ya
        </button>
      </div>
    </div>
  );
}

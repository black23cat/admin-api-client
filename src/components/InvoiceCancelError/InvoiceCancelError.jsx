import styles from './InvoiceCancelError.module.css';

export default function InvoiceCancelError({ invoiceNumber, closeModal }) {
  return (
    <div className={styles['cancel-error']}>
      <h3>Gagal membatalkan invoice {invoiceNumber}</h3>
      <button type="button" onClick={closeModal}>
        Tutup
      </button>
    </div>
  );
}

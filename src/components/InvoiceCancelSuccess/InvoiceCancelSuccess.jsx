import styles from './InvoiceCancelSuccess.module.css';

export default function InvoiceCancelSuccess({ invoiceNumber, closeModal }) {
  return (
    <div className={styles['cancel-invoice']}>
      <h3>Berhasil membatalkan invoice &quot;INV-{invoiceNumber}&quot;</h3>
      <button type="button" onClick={closeModal}>
        Tutup
      </button>
    </div>
  );
}

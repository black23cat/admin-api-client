import styles from './PaymentError.module.css';

export default function PaymentError({ invoice, closeModal }) {
  return (
    <div className={styles['payment-error']}>
      <h3>Gagal melakukan pembayaran invoice INV-{invoice.invoiceNumber}</h3>
      <button type="button" onClick={closeModal}>
        Tutup
      </button>
    </div>
  );
}

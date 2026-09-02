import formatter from '../../utils/formatter';
import styles from './PaymentSucces.module.css';

export default function PaymentSuccess({ invoice, closeModal }) {
  const amountPaid =
    invoice.paymentDetails[invoice.paymentDetails.length - 1].amountPaid;

  return (
    <div className={styles['payment-success']}>
      <h3>
        Pembayaran Invoice &quot;INV-{invoice.invoiceNumber}&quot; sebesar{' '}
        &quot;{formatter.format(amountPaid)}&quot; berhasil
      </h3>
      <button type="button" onClick={closeModal}>
        Tutup
      </button>
    </div>
  );
}

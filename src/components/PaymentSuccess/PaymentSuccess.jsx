import formatter from '../../utils/formatter';

export default function PaymentSuccess({ invoice, closeModal }) {
  const amountPaid =
    invoice.paymentDetails[invoice.paymentDetails.length - 1].amountPaid;

  return (
    <>
      <h1>
        Pembayaran Invoice INV-{invoice.invoiceNumber} sebesar{' '}
        {formatter.format(amountPaid)} berhasil
      </h1>
      <button type="button" onClick={closeModal}>
        Tutup
      </button>
    </>
  );
}

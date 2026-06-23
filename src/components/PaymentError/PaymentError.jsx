export default function PaymentError({ invoice, closeModal }) {
  return (
    <>
      <h1>Gagal melakukan pembayaran invoice INV-{invoice.invoiceNumber}</h1>
      <button type="button" onClick={closeModal}>
        Tutup
      </button>
    </>
  );
}

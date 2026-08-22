import { format } from 'date-fns';
import formatter from '../../utils/formatter';
import Dialog from '../Dialog/Dialog';
import { useState } from 'react';
import PaymentForm from '../PaymentForm/PaymentForm';
import PaymentError from '../PaymentError/PaymentError';
import PaymentSuccess from '../PaymentSuccess/PaymentSuccess';
import styles from './InvoiceCard.module.css';
import CancelReceipt from '../../assets/svg/CancelReceipt';
import Printer from '../../assets/svg/Printer';
import Pay from '../../assets/svg/Pay';

const API_URL = import.meta.env.VITE_API_URL;

export default function InvoiceCard({ invoice, updateInvoice }) {
  const [openModal, setOpenModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [cancelConfirmation, setCancelConfirmation] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [cancelError, setCancelError] = useState(false);

  const openPaymentForm = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setPaymentSuccess(false);
    setPaymentError(false);
    setCancelConfirmation(false);
    return setOpenModal(false);
  };

  const handlePaymentSubmit = async (e, formData) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (invoice.status === 'Paid') {
      return setPaymentError(true);
    }
    try {
      const response = await fetch(`${API_URL}/invoice/pay/${invoice.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        updateInvoice(result);
        return setPaymentSuccess(true);
      } else {
        return setPaymentError(true);
      }
    } catch {
      setPaymentError(true);
    }
  };

  const handleCancelInvoice = async (action = 'openModal') => {
    if (
      invoice.status === 'Paid' ||
      invoice.paymentDetails.length > 0 ||
      invoice.status === 'Cancelled'
    ) {
      return;
    }
    if (action === 'openModal') {
      setOpenModal(true);
      setCancelConfirmation(true);
      return;
    }
    if (action === 'confirm') {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `${API_URL}/invoice/cancel/${invoice.id}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.ok) {
          const result = await response.json();
          updateInvoice(result);
          return setCancelSuccess(true);
        } else {
          return setCancelError(true);
        }
      } catch {
        return setCancelError(true);
      }
    }

    throw 'No actions.';
  };

  return (
    <div className={styles['invoice-card']}>
      <Dialog isOpen={openModal} closeModal={closeModal}>
        {paymentError ? (
          <PaymentError invoice={invoice} closeModal={closeModal} />
        ) : paymentSuccess ? (
          <PaymentSuccess invoice={invoice} closeModal={closeModal} />
        ) : cancelSuccess ? (
          <>
            <h3>Berhasil membatalkan invoice {invoice.invoiceNumber}</h3>
            <button type="button" onClick={closeModal}>
              Tutup
            </button>
          </>
        ) : cancelError ? (
          <>
            <h3>Gagal membatalkan invoice {invoice.invoiceNumber}</h3>
            <button type="button" onClick={closeModal}>
              Tutup
            </button>
          </>
        ) : cancelConfirmation ? (
          <>
            <h3>Ingin membatalkan invoice</h3>
            <div>
              <button
                type="button"
                onClick={() => handleCancelInvoice('confirm')}
              >
                Ya
              </button>
              <button type="button" onClick={closeModal}>
                Batal
              </button>
            </div>
          </>
        ) : (
          <PaymentForm
            invoiceData={invoice}
            handleSubmit={handlePaymentSubmit}
            cancelBtnHandler={closeModal}
          />
        )}
      </Dialog>
      <InvoiceDetails invoice={invoice} />
      <InvoiceButtons
        invoice={invoice}
        openPaymentForm={openPaymentForm}
        cancelInvoice={handleCancelInvoice}
      />
    </div>
  );
}

function InvoiceDetails({ invoice }) {
  const invoiceStatus = invoice.status;
  return (
    <div className={styles.details}>
      <p>#INV-{invoice.invoiceNumber}</p>
      <p>{invoice.customerName}</p>
      <p>{format(new Date(invoice.createdAt), 'dd-MMM-yyyy')}</p>
      <p>{formatter.format(invoice.amount[0].total)}</p>
      <p
        className={
          invoiceStatus === 'Pending'
            ? styles.pending
            : invoiceStatus === 'Paid'
              ? styles.paid
              : styles.cancelled
        }
      >
        {invoiceStatus}
      </p>
    </div>
  );
}

function InvoiceButtons({ invoice, openPaymentForm, cancelInvoice }) {
  return (
    <div className={styles['invoice-buttons']}>
      <button
        data-testid="bayar-invoice"
        type="button"
        onClick={openPaymentForm}
        disabled={invoice.status === 'Paid'}
      >
        <Pay />
      </button>
      <button data-testid="print-invoice" type="button">
        <Printer />
      </button>
      <button
        data-testid="batalkan-invoice"
        type="button"
        onClick={() => cancelInvoice('openModal')}
        disabled={
          invoice.status === 'Paid' ||
          invoice.paymentDetails.length > 0 ||
          invoice.status === 'Cancelled'
        }
      >
        <CancelReceipt />
      </button>
    </div>
  );
}

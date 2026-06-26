import { format } from 'date-fns';
import formatter from '../../utils/formatter';
import Dialog from '../Dialog/Dialog';
import { useState } from 'react';
import PaymentForm from '../PaymentForm/PaymentForm';
import PaymentError from '../PaymentError/PaymentError';
import PaymentSuccess from '../PaymentSuccess/PaymentSuccess';

const API_URL = import.meta.env.VITE_API_URL;

export default function InvoiceCard({ invoice, updateInvoice }) {
  const [openModal, setOpenModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  const openPaymentForm = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setPaymentSuccess(false);
    setPaymentError(false);
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

  return (
    <div className="invoice-card">
      <Dialog isOpen={openModal} closeModal={closeModal}>
        {paymentError ? (
          <PaymentError invoice={invoice} closeModal={closeModal} />
        ) : paymentSuccess ? (
          <PaymentSuccess invoice={invoice} closeModal={closeModal} />
        ) : (
          <PaymentForm
            invoiceData={invoice}
            handleSubmit={handlePaymentSubmit}
            cancelBtnHandler={closeModal}
          />
        )}
      </Dialog>
      <h3>#INV-{invoice.invoiceNumber}</h3>
      <span>
        <h4>{invoice.customerName}</h4>
        <p>{invoice.customerPhone}</p>
      </span>
      <p>{format(new Date(invoice.createdAt), 'dd-MMM-yyyy')}</p>
      <p>{formatter.format(invoice.amount[0].total)}</p>
      <p>{invoice.status}</p>
      <div className="action-button-wrapper">
        <button
          type="button"
          onClick={openPaymentForm}
          disabled={invoice.status === 'Paid'}
        >
          <img src="example.com" alt="Pay Invoice" />
        </button>
        <button type="button">
          <img src="example.com" alt="Print Invoice" />
        </button>
        <button type="button">
          <img src="example.com" alt="Batalkan Invoice" />
        </button>
      </div>
    </div>
  );
}

import { format } from 'date-fns';
import formatter from '../../utils/formatter';

export default function InvoiceCard({ invoice }) {
  return (
    <div className="invoice-card">
      <h3>#INV{invoice.invoiceNumber}</h3>
      <span>
        <h4>{invoice.customerName}</h4>
        <p>{invoice.customerPhone}</p>
      </span>
      <p>{format(new Date(), 'dd-MMM-yyyy')}</p>
      <p>{formatter.format(invoice.amount)}</p>
      <p>{invoice.status}</p>
      <div className="action-button-wrapper">
        <button>Bayar Invoice</button>
        <button>
          <img src="example.com" alt="Print Invoice" />
        </button>
        <button>
          <img src="example.com" alt="Delete Invoice" />
        </button>
      </div>
    </div>
  );
}

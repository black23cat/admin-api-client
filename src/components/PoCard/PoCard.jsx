import { format } from 'date-fns';
import PoForm from '../PoForm/PoForm';

export default function PoCard({
  purchaseOrder,
  handleCardClick,
  isOpen,
  closeCardForm,
  updatePo,
}) {
  return (
    <div
      style={{ border: '1px solid red', cursor: 'pointer' }}
      className="card"
      role="button"
      tabIndex={0}
      onClick={() => handleCardClick(purchaseOrder.id)}
    >
      <CardDetails purchaseOrder={purchaseOrder} />
      {isOpen && (
        <>
          <PoForm
            poData={purchaseOrder}
            closeCardForm={closeCardForm}
            updatePo={updatePo}
          />
          <CardButton />
        </>
      )}
    </div>
  );
}

function CardDetails({ purchaseOrder }) {
  return (
    <div className="poDetails">
      <h3>{purchaseOrder.customerName}</h3>
      <p>{format(purchaseOrder.createdAt, 'dd-MMM-yyyy')}</p>
    </div>
  );
}

function CardButton() {
  return (
    <div className="card-button">
      <button>
        <img src="example.com" alt="print purchase order" />
      </button>
      <button>
        <img src="example.com" alt="delete purchase order" />
      </button>
    </div>
  );
}

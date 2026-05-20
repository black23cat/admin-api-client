import { format } from 'date-fns';
import { useState } from 'react';

export default function PoCard({ purchaseOrder, expandCard = false }) {
  const [edit, setEdit] = useState(false);
  const toggleEditForm = () => {
    setEdit(!edit);
  };
  return (
    <div className="card">
      <div className="poDetails" role="button" tabIndex={0}>
        <h3>{purchaseOrder.customerName}</h3>
        <p>{format(purchaseOrder.createdAt, 'MM-dd-yyyy')}</p>
        <div className="card-button">
          <button onClick={toggleEditForm}>
            <img src="example.com" alt="edit purchase order" />
          </button>{' '}
          <button>
            <img src="example.com" alt="delete purchase order" />
          </button>
          <button>
            <img src="example.com" alt="print purchase order" />
          </button>
          <button
            data-testid="select-button"
            disabled={purchaseOrder.invoiceId === null ? false : true}
          >
            <img src="example.com" alt="select purchase order" />
          </button>
        </div>
        {expandCard && edit ? (
          <form data-testid="edit-po-form">
            {purchaseOrder.fileList.map((file, index) => {
              <div key={file.id}>
                <label htmlFor={file.id}>{`File ${index}:`}</label>
                <input id={file.id} type="text" value={file.filename} />
              </div>;
            })}
          </form>
        ) : expandCard ? (
          <div className="file-list">
            {purchaseOrder.fileList.map((file) => (
              <div key={file.id}>
                <h3>{file.filename}</h3>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

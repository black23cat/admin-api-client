import { useState } from 'react';

export default function InvoiceConfirmForm({
  data,
  handleSubmit,
  handleCancel,
}) {
  const [confirmFormInput, setConfirmFormInput] = useState(data.printDetails);
  const [customerName, setCustomerName] = useState(data.customerName);
  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const formInput = { ...confirmFormInput };
    if (name === 'ecoLength') {
      formInput.eco.printLength = value;
      return setConfirmFormInput(formInput);
    } else if (name === 'ecoPrice') {
      formInput.eco.price = value;
      return setConfirmFormInput(formInput);
    } else if (name === 'sublimLength') {
      formInput.sublim.printLength = value;
      return setConfirmFormInput(formInput);
    } else if (name === 'sublimPrice') {
      formInput.sublim.price = value;
      return setConfirmFormInput(formInput);
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e, { ...confirmFormInput, customerName })}
      >
        {data.needMissmatchConfirmation && (
          <>
            <span
              style={{
                border: '1px solid red',
                padding: '2px',
                backgroundColor: 'red',
              }}
            >
              Nama customer berbeda.
            </span>
          </>
        )}
        <div>
          <label htmlFor="customerName">Nama Customer :</label>
          <input
            type="text"
            name="customerName"
            id="customerName"
            value={customerName}
            onChange={(e) => handleCustomerNameChange(e)}
          />
        </div>
        <h4>Eco Solvent :</h4>
        <div>
          <label htmlFor="ecoLength">Total(m) :</label>
          <input
            id="ecoLength"
            name="ecoLength"
            type="number"
            value={
              confirmFormInput.eco.printLength === null
                ? 0
                : confirmFormInput.eco.printLength
            }
            onChange={(e) => onChange(e, 'ecoLength')}
          />
        </div>
        <div>
          <label htmlFor="ecoPrice"> Harga (/m) :</label>
          <input
            id="ecoPrice"
            name="ecoPrice"
            type="number"
            value={confirmFormInput.eco.price}
            onChange={(e) => onChange(e, 'ecoPrice')}
          />
        </div>
        <h4>Sublim :</h4>
        <div>
          <label htmlFor="sublimLength">Total(m) :</label>
          <input
            id="sublimLength"
            name="sublimLength"
            type="number"
            value={
              confirmFormInput.sublim.printLength === null
                ? 0
                : confirmFormInput.sublim.printLength
            }
            onChange={(e) => onChange(e, 'sublimLength')}
          />
        </div>
        <div>
          <label htmlFor="sublimPrice">Harga (/m) :</label>
          <input
            id="sublimPrice"
            name="sublimPrice"
            type="number"
            value={confirmFormInput.sublim.price}
            onChange={(e) => onChange(e, 'sublimPrice')}
          />
        </div>
        <p>Lanjutkan ?</p>
        <div>
          <button type="submit">Ya</button>
          <button type="button" onClick={handleCancel}>
            Batal
          </button>
        </div>
      </form>
    </>
  );
}

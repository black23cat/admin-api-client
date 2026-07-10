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
    } else if (name === 'ecoBahanLength') {
      formInput.ecoBahan.printLength = value;
      return setConfirmFormInput(formInput);
    } else if (name === 'ecoBahanPrice') {
      formInput.ecoBahan.price = value;
      return setConfirmFormInput(formInput);
    } else if (name === 'sublimPressLength') {
      formInput.sublimPress.printLength = value;
      return setConfirmFormInput(formInput);
    } else if (name === 'sublimPressPrice') {
      formInput.sublimPress.price = value;
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
        <h3>Eco Solvent</h3>
        <h4>Print :</h4>
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
        <h4>Print + Bahan :</h4>
        <div>
          <label htmlFor="ecoBahanLength">Total(m) :</label>
          <input
            id="ecoBahanLength"
            name="ecoBahanLength"
            type="number"
            value={
              confirmFormInput.ecoBahan.printLength === null
                ? 0
                : confirmFormInput.ecoBahan.printLength
            }
            onChange={(e) => onChange(e, 'ecoBahanLength')}
          />
        </div>
        <div>
          <label htmlFor="ecoBahanPrice"> Harga (/m) :</label>
          <input
            id="ecoBahanPrice"
            name="ecoBahanPrice"
            type="number"
            value={confirmFormInput.ecoBahan.price}
            onChange={(e) => onChange(e, 'ecoBahanPrice')}
          />
        </div>
        <h3>Sublim</h3>
        <h4>Print + Press + Bahan :</h4>
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
        <h4>Print + Press :</h4>
        <div>
          <label htmlFor="sublimPressLength">Total(m) :</label>
          <input
            id="sublimPressLength"
            name="sublimPressLength"
            type="number"
            value={
              confirmFormInput.sublimPress.printLength === null
                ? 0
                : confirmFormInput.sublimPress.printLength
            }
            onChange={(e) => onChange(e, 'sublimPressLength')}
          />
        </div>
        <div>
          <label htmlFor="sublimPressPrice">Harga (/m) :</label>
          <input
            id="sublimPressPrice"
            name="sublimPressPrice"
            type="number"
            value={confirmFormInput.sublimPress.price}
            onChange={(e) => onChange(e, 'sublimPressPrice')}
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

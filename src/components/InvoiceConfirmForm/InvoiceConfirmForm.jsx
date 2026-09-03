import { useState } from 'react';
import styles from './InvoiceConfirmForm.module.css';
import formatter from '../../utils/formatter';
import Trash from '../../assets/svg/Trash';

export default function InvoiceConfirmForm({
  data,
  handleSubmit,
  handleCancel,
}) {
  const [confirmFormInput, setConfirmFormInput] = useState(data.printDetails);
  const [customerName, setCustomerName] = useState(data.customerName);
  const [nonPrintValue, setNonPrintValue] = useState({
    itemName: '',
    itemCount: '',
    itemPrice: '',
    cashbackNotes: '',
    cashbackAmount: '',
  });
  const [nonPrintItems, setNonPrintItems] = useState([]);
  const [addNonPrintItemError, setAddNonPrintItemError] = useState(false);
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

  const nonPrintOnchange = (e) => {
    setAddNonPrintItemError(false);
    const name = e.target.name;
    const value = e.target.value;
    const nonPrintItem = { ...nonPrintValue };
    nonPrintItem[name] = value;

    setNonPrintValue(nonPrintItem);
  };

  const handleAddNonPrintItem = () => {
    if (
      nonPrintValue.itemName === '' ||
      nonPrintValue.itemPrice === '' ||
      nonPrintValue.itemCount === ''
    ) {
      return setAddNonPrintItemError(true);
    }
    const resetValue = {
      ...nonPrintValue,
      itemName: '',
      itemCount: '',
      itemPrice: '',
    };
    setNonPrintValue(resetValue);
    setNonPrintItems([
      ...nonPrintItems,
      {
        itemName: nonPrintValue.itemName,
        itemPrice: nonPrintValue.itemPrice,
        itemCount: nonPrintValue.itemCount,
      },
    ]);
  };

  const handleFormSubmit = (e) => {
    const formData = {
      ...confirmFormInput,
      customerName,
      nonPrintItems: nonPrintItems.length > 0 ? nonPrintItems : null,
      cashback:
        nonPrintValue.cashbackAmount === ''
          ? null
          : {
              note: nonPrintValue.cashbackNotes,
              amount: nonPrintValue.cashbackAmount,
            },
    };

    handleSubmit(e, formData);
  };
  return (
    <form className={styles['confirm-form']} onSubmit={handleFormSubmit}>
      <h3>Konfirmasi pembuatan invoice</h3>

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
      <fieldset className={styles.eco}>
        <legend>Eco Solvent</legend>
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
      </fieldset>
      <fieldset>
        <legend>Sublim</legend>
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
      </fieldset>
      <fieldset>
        <legend>Non Print Item</legend>
        <div>
          <label htmlFor="itemName">Nama Item :</label>
          <input
            type="text"
            name="itemName"
            id="itemName"
            onChange={nonPrintOnchange}
            value={nonPrintValue.itemName}
          />
        </div>
        <div>
          <label htmlFor="itemCount">Jumlah Item : </label>
          <input
            type="number"
            name="itemCount"
            id="itemCount"
            onChange={nonPrintOnchange}
            value={nonPrintValue.itemCount}
          />
        </div>
        <div>
          <label htmlFor="itemPrice">Harga Per-item :</label>
          <input
            type="number"
            name="itemPrice"
            id="itemPrice"
            onChange={nonPrintOnchange}
            value={nonPrintValue.itemPrice}
          />
        </div>
        <div className={styles['non-print-items-wrapper']}>
          {nonPrintItems.length > 0 && (
            <>
              {nonPrintItems.map((item, index) => {
                return (
                  <div key={index} className={styles['non-print-items']}>
                    <p>
                      {`${item.itemName}`}{' '}
                      <span>{`(${item.itemCount}) x ${formatter.format(item.itemPrice)}`}</span>
                    </p>
                    <button type="button">
                      <Trash />
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>{' '}
        <div>
          {addNonPrintItemError && <span>Harap isi field terlebih dahulu</span>}
          <button type="button" onClick={handleAddNonPrintItem}>
            (+)Item
          </button>
        </div>
      </fieldset>
      <fieldset>
        <legend>Cashback</legend>
        <div>
          <label htmlFor="cashbackNotes">Keterangan :</label>
          <input
            type="text"
            name="cashbackNotes"
            id="cashbackNotes"
            onChange={nonPrintOnchange}
            value={nonPrintValue.cashbackNotes}
          />
        </div>
        <div>
          <label htmlFor="cashbackAmount">Jumlah (Rp) :</label>
          <input
            type="number"
            name="cashbackAmount"
            id="cashbackAmount"
            min={0}
            onChange={nonPrintOnchange}
            value={nonPrintValue.cashbackAmount}
          />
        </div>
      </fieldset>
      {data.needMissmatchConfirmation && (
        <p className={styles.warn}>Nama customer berbeda.</p>
      )}
      <div>
        <p>Lanjutkan ?</p>
        <div className={styles['button-wrapper']}>
          <button type="button" onClick={handleCancel}>
            Batal
          </button>
          <button type="submit">Ya</button>
        </div>
      </div>
    </form>
  );
}

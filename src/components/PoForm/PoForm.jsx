import { useEffect, useState } from 'react';
import { matchFilename } from '../../utils/regexPattern';
import { useNavigate } from 'react-router';
import styles from './PoForm.module.css';
import Trash from '../../assets/svg/Trash';

const API_URL = import.meta.env.VITE_API_URL;

export default function PoForm({ poData = null, closeCardForm, updatePo }) {
  const [customerName, setCustomerName] = useState(
    poData === null ? '' : poData.customerName,
  );
  const [poType, setPoType] = useState(poData === null ? 'eco' : poData.poType);
  const [validFiles, setValidFiles] = useState(
    poData === null ? [] : poData.fileList.map((file) => file.filename),
  );
  const [invalidFiles, setInvalidFiles] = useState([]);
  const [formError, setFormError] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [editPo, setEditPo] = useState(false);

  const navigate = useNavigate();

  const handleChange = (value) => {
    setCustomerName(value);
  };

  const handlePoType = (value) => {
    setPoType(value);
  };

  const handleFiles = (e) => {
    const files = e.target.files;
    const acceptedFiles = [];
    const rejectedFiles = [];

    for (const file of files) {
      const sliceIndex = file.name.indexOf('.');
      const filename = file.name.slice(0, sliceIndex);
      if (matchFilename(filename)) {
        acceptedFiles.push(filename);
      } else {
        rejectedFiles.push(filename);
      }
    }
    setInvalidFiles([...rejectedFiles, ...invalidFiles]);
    setValidFiles([...acceptedFiles, ...validFiles]);
  };

  const deleteUploadedFile = (filename) => {
    let firstMatch = false; //Only delete first match of file
    const files = validFiles.filter((file) => {
      if (file !== filename || firstMatch) {
        return file;
      }
      firstMatch = true;
    });
    setValidFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validFiles.length === 0) {
      return setErrorMsg('Tidak ada file yang diupload');
    }
    if (customerName === '') {
      return setErrorMsg('Nama Customer tidak boleh kosong');
    }
    const token = localStorage.getItem('token');
    if (token === null) {
      setErrorMsg(
        'Token sudah expired, silahkan login ulang untuk membuat atau mengedit Invoice',
      );
    }
    const fileList = validFiles.map((file) => {
      return { filename: file };
    });
    const invoiceErrorMsg = 'Gagal membuat invoice';
    if (poData === null) {
      try {
        const response = await fetch(`${API_URL}/purchase-order/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            customerName,
            poType,
            fileList: fileList,
          }),
        });

        if (response.status === 201) {
          return navigate('/purchase-order');
        }
        if (response.status === 400) {
          const result = await response.json();
          return setFormError(result);
        }
        throw new Error(invoiceErrorMsg);
      } catch {
        setErrorMsg(invoiceErrorMsg);
      }
      return;
    }
    let edited;
    for (let i = 0; i < validFiles.length; i++) {
      if (validFiles.length !== poData.length) {
        edited = true;
        break;
      }
      if (
        validFiles.length === poData.length &&
        !validFiles.includes(poData.fileList[i].filename)
      ) {
        edited = true;
        break;
      }
      edited = false;
    }
    if (
      !edited &&
      customerName === poData.customerName &&
      poType === poData.poType
    ) {
      return setErrorMsg('Po tidak dirubah');
    } else if (poData.invoiceId !== null) {
      return setErrorMsg(
        'Gagal mengedit po. Invoice untuk po ini sudah dibuat.',
      );
    } else {
      const editPoErrorMsg = 'Gagal mengedit po';
      try {
        const response = await fetch(`${API_URL}/purchase-order/${poData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            customerName,
            poType,
            fileList: fileList,
          }),
        });
        if (response.status === 200) {
          const result = await response.json();
          updatePo(result);
          return setEditPo(true);
        }
        if (response.status === 400) {
          const result = await response.json();
          setFormError(result);
        }
        throw new Error(editPoErrorMsg);
      } catch {
        setErrorMsg(editPoErrorMsg);
      }
    }
  };

  useEffect(() => {
    if (!editPo) {
      return;
    }
    const timeout = setTimeout(() => {
      setEditPo(false);
      closeCardForm();
      navigate('/purchase-order');
    }, 500);
    return () => clearTimeout(timeout);
  });

  return (
    <FormWrapper poData={poData === null}>
      {poData !== null && <button onClick={closeCardForm}>x</button>}
      {formError.length > 0 && (
        <ul>
          {formError.map((error, index) => (
            <li key={index}>{error.msg}</li>
          ))}
        </ul>
      )}
      {poData === null && <h3>Buat PO Baru</h3>}
      <form
        className={styles['po-form']}
        onSubmit={handleSubmit}
        data-testid="purchase-order-form"
      >
        <div className={styles.warn}>
          <p>
            Harap gunakan nama file dengan format &quot;NAMA
            FILE_22-25_130x100_WARNA_2x.tif&quot; atau &quot;Nama
            File_130x100_2x&quot;
          </p>
        </div>
        <div>
          <label htmlFor="customer-name">Nama Customer :</label>
          <input
            type="text"
            name="customer-name"
            id="customer-name"
            onChange={(e) => handleChange(e.target.value)}
            value={customerName}
          />
        </div>
        <div className={styles['select-wrapper']}>
          <label htmlFor="poType">Tipe po :</label>
          <select
            name="poType"
            id="poType"
            value={poType}
            onChange={(e) => handlePoType(e.target.value)}
          >
            <option value="eco">Eco Solvent</option>
            <option value="ecoBahan">Eco Solvent + Bahan</option>
            <option value="sublimPress">Sublim</option>
            <option value="sublim">Sublim + Bahan</option>
          </select>
        </div>
        <div className={styles['file-uploader']}>
          <label htmlFor="files">Upload Files :</label>
          <input
            type="file"
            name="files"
            id="files"
            onChange={(e) => handleFiles(e)}
            multiple
          />
        </div>
        <div className={styles['uploaded-files']}>
          <div className={styles['valid-files']}>
            <p>Valid Files : </p>
            <ul className={styles.valid}>
              {validFiles.length > 0
                ? validFiles.map((file, index) => (
                    <li key={index}>
                      <p>
                        {file}
                        <button
                          data-testid="delete-file"
                          className={styles['delete-file']}
                          onClick={() => deleteUploadedFile(file)}
                        >
                          <Trash />
                        </button>
                      </p>
                    </li>
                  ))
                : ''}
            </ul>
          </div>
          <div className={styles['invalid-files']}>
            <p>Invalid Files : </p>
            <ul className={styles.invalid}>
              {invalidFiles.length > 0
                ? invalidFiles.map((file, index) => (
                    <li key={index}>
                      <p>{file}</p>
                    </li>
                  ))
                : ''}
            </ul>
          </div>
        </div>
        <div className={styles.error}>
          {errorMsg !== '' && <span>{errorMsg}</span>}
        </div>
        <div className={styles['button-wrapper']}>
          <button
            className={styles.cancel}
            type="button"
            onClick={
              poData === null
                ? () => navigate('/purchase-order')
                : closeCardForm
            }
          >
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
        {editPo && <span>Berhasil mengedit po</span>}
      </form>
    </FormWrapper>
  );
}

function FormWrapper({ children, poData = false }) {
  return poData ? (
    <main>{children}</main>
  ) : (
    <div className={styles['po-form-wrapper']}>{children}</div>
  );
}

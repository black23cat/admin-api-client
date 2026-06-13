import { useEffect, useState } from 'react';
import { matchFilename } from '../../utils/regexPattern';
import { useNavigate } from 'react-router';

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
    <>
      {formError.length > 0 && (
        <ul>
          {formError.map((error, index) => (
            <li key={index}>{error.msg}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} data-testid="purchase-order-form">
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
        <div>
          <label htmlFor="poType">Tipe po :</label>
          <select
            name="poType"
            id="poType"
            value={poType}
            onChange={(e) => handlePoType(e.target.value)}
          >
            <option value="eco">Eco Solvent</option>
            <option value="sublim">Sublim</option>
          </select>
        </div>
        <div>
          <label htmlFor="files">Upload Files :</label>
          <input
            type="file"
            name="files"
            id="files"
            onChange={(e) => handleFiles(e)}
            multiple
          />
        </div>
        <div>
          <p>Uploaded Files : </p>
          <ul>
            {validFiles.length > 0
              ? validFiles.map((file, index) => (
                  <li key={index}>
                    {file}
                    <button onClick={() => deleteUploadedFile(file)}>x</button>
                  </li>
                ))
              : ''}
          </ul>
          <p>Invalid Files : </p>
          <ul>
            {invalidFiles.length > 0
              ? invalidFiles.map((file, index) => <li key={index}>{file}</li>)
              : ''}
          </ul>
        </div>
        <div>
          {errorMsg !== '' && <span>{errorMsg}</span>}
          <button type="submit">Submit</button>
          <button type="button" onClick={closeCardForm}>
            Cancel
          </button>
        </div>
        {editPo && <span>Berhasil mengedit po</span>}
      </form>
    </>
  );
}

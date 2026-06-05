import { useState } from 'react';
import { matchFilename } from '../../utils/regexPattern';
import { useNavigate } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL;

export default function PoForm() {
  const [customerName, setCustomerName] = useState('');
  const [poType, setPoType] = useState('eco');
  const [validFiles, setValidFiles] = useState([]);
  const [invalidFiles, setInvalidFiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

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
        'Token sudah expired, silahkan login ulang untuk membuat Invoice',
      );
    }
    const fileList = validFiles.map((file) => {
      return { filename: file };
    });
    try {
      const response = await fetch(`${API_URL}/purchase-order`, {
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
      throw new Error('Gagal membuat invoice');
    } catch {
      setErrorMsg('Gagal membuat invoice');
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
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
          <button>Cancel</button>
        </div>
      </form>
    </>
  );
}

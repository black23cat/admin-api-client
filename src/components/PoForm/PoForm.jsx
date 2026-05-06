import { useState } from 'react';
import { matchFilename } from '../../utils/regexPattern';

const API_URL = import.meta.env.VITE_API_URL;

export default function PoForm() {
  const [validFiles, setValidFiles] = useState([]);
  const [invalidFiles, setInvalidFiles] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFiles = (e) => {
    const files = e.target.files;
    const acceptedFiles = [...validFiles];
    const rejectedFiles = [...invalidFiles];

    for (const file of files) {
      const sliceIndex = file.name.indexOf('.');
      const filename = file.name.slice(0, sliceIndex);
      if (matchFilename(filename)) {
        acceptedFiles.push(filename);
      } else {
        rejectedFiles.push(file.name);
      }
    }
    setInvalidFiles(rejectedFiles);
    setValidFiles(acceptedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validFiles.length === 0) {
      return setErrorMsg('Tidak ada file yang diupload');
    }
    try {
      const response = await fetch(`${API_URL}/api/order/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validFiles),
      });
      if (!response.status === 201) {
        throw new Error('Fetch request failed');
      }
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      {error && <span>Terjadi masalah ketika membuat Purchase Order(PO)</span>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customer-name">Nama Customer :</label>
          <input type="text" name="customer-name" id="customer-name" />
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
              ? validFiles.map((file, index) => <li key={index}>{file}</li>)
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

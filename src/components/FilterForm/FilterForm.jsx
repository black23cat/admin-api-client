import { format } from 'date-fns';
import { useState } from 'react';

export default function FilterForm({ handleFilterButtonClick, type = 'po' }) {
  const todayDate = new Date();

  const [searchBox, setSearchBox] = useState('');
  const [selectedValue, setSelectedValue] = useState(
    type === 'invoice' ? 'invoiceNumber' : null,
  );
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchChange = (e) => {
    setSearchBox(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    return name === 'dateStart' ? setDateStart(value) : setDateEnd(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedValue === '') {
      const errorMsg =
        type === 'po'
          ? 'Filter tanggal tidak boleh kosong'
          : 'Filter tanggal atau sort tidak boleh kosong';
      return setErrorMessage(errorMsg);
    }
    if (dateStart > dateEnd && dateStart !== '' && dateEnd !== '') {
      return setErrorMessage('Tanggal Awal lebih besar dari tanggal akhir.');
    }

    const formData = {
      dateStart,
      dateEnd,
    };

    if (type === 'invoice') {
      formData.sortBy = selectedValue;
    }
    if (type !== 'job-data') {
      formData.query = searchBox;
    }

    setErrorMessage('');
    handleFilterButtonClick(formData);
  };

  const handleReset = () => {
    setSearchBox('');
    setSelectedValue(type === 'invoice' ? 'invoiceNumber' : null);
    setDateStart('');
    setDateEnd('');
    setErrorMessage('');

    handleFilterButtonClick({}, true);
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Filter Invoice">
      {type !== 'job-data' && (
        <div>
          <label htmlFor="search-invoice">Search :</label>
          <input
            type="search"
            name="search-invoice"
            id="search-invoice"
            placeholder={`Cari ${type === 'po' ? 'Purchase Order' : 'Invoice'}...(Max 20karakter)`}
            value={searchBox}
            maxLength={20}
            onChange={handleSearchChange}
          />
        </div>
      )}
      {type === 'invoice' && (
        <div>
          <label htmlFor="sort-by">Urutkan :</label>
          <select
            name="sort-by"
            id="sort-by"
            onChange={handleSelectChange}
            value={selectedValue}
          >
            <option value="invoiceNumber">Invoice</option>
            <option value="amount">Nilai Invoice</option>
            <option value="createdAt">Tanggal</option>
            <option value="status">Status</option>
          </select>
        </div>
      )}
      <div>
        <label htmlFor="dateStart">Tanggal Awal :</label>
        <input
          type="date"
          name="dateStart"
          id="dateStart"
          value={dateStart}
          max={format(todayDate, 'yyyy-MM-dd')}
          onChange={handleDateChange}
        />
      </div>
      <div>
        <label htmlFor="dateEnd">Tanggal Akhir :</label>
        <input
          type="date"
          name="dateEnd"
          id="dateEnd"
          value={dateEnd}
          max={format(todayDate, 'yyyy-MM-dd')}
          onChange={handleDateChange}
        />
      </div>
      <div>
        {errorMessage !== '' && <span>{errorMessage}</span>}
        <button type="submit">Apply</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
}

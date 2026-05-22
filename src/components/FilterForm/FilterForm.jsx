import { format } from 'date-fns';
import { useState } from 'react';

const todayDate = new Date();
export default function FilterForm({ handleFilterSubmit }) {
  const [searchBox, setSearchBox] = useState('');
  const [selectedValue, setSelectedValue] = useState('invoice');
  const [datePicker, setDatePicker] = useState(format(todayDate, 'yyyy-MM-dd'));
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchChange = (e) => {
    setSearchBox(e.target.value);
  };
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const handleDateChange = (e) => {
    setDatePicker(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchBox.length > 20) {
      return setErrorMessage('Melebihi karakter maksimal');
    }
    if (datePicker === '' || selectedValue === '') {
      return setErrorMessage('Filter tanggal atau sort tidak boleh kosong');
    }
    handleFilterSubmit({
      query: searchBox,
      sortBy: selectedValue,
      date: datePicker,
    });
  };
  return (
    <form onSubmit={handleSubmit} aria-label="Filter Invoice">
      <div>
        <label htmlFor="search-invoice">Search :</label>
        <input
          type="search"
          name="search-invoice"
          id="search-invoice"
          placeholder="Cari Invoice...(Max 20karakter)"
          value={searchBox}
          maxLength={20}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <label htmlFor="sort-by">Sort By :</label>
        <select
          name="sort-by"
          id="sort-by"
          onChange={handleSelectChange}
          value={selectedValue}
        >
          <option value="invoice">Invoice</option>
          <option value="date">Tanggal</option>
          <option value="amount">Jumlah</option>
          <option value="status">Status</option>
        </select>
      </div>
      <div>
        <label htmlFor="date">Minggu :</label>
        <input
          type="date"
          name="date"
          id="date"
          value={datePicker}
          max={format(todayDate, 'yyyy-mm-dd')}
          onChange={handleDateChange}
        />
      </div>
      <div>
        {errorMessage !== '' && <span>{errorMessage}</span>}
        <button type="submit">Apply</button>
      </div>
    </form>
  );
}

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import FilterForm from '../FilterForm/FilterForm';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import { id } from 'date-fns/locale';
import styles from './PaymentData.module.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function PaymentData() {
  const [paymentData, setPaymentData] = useState([]);
  const [fetchErrorMsg, setFetchErrorMsg] = useState('');
  const [filterParams, setFilterParams] = useSearchParams({
    page: 1,
    query: '',
    dateStart: '',
    dateEnd: '',
  });
  const dateStart = filterParams.get('dateStart');
  const dateEnd = filterParams.get('dateEnd');

  const handleFilterButtonClick = (filterData, reset = false) => {
    if (reset) {
      return setFilterParams({
        page: 1,
        query: '',
        dateStart: '',
        dateEnd: '',
      });
    }
    const weekStartOption = { weekStartsOn: 1 };
    if (filterData.dateStart === '' && filterData.dateEnd === '') {
      filterData.dateStart = startOfWeek(new Date(), { weekStartOption });
      filterData.dateEnd = endOfWeek(new Date(), { weekStartOption });
    }

    const newUrlParams = { page: '1', filter: '1', ...filterData };
    setFilterParams(newUrlParams);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `${API_URL}/invoice/payment?${filterParams}`,
          {
            signal: abortController.signal,
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.ok) {
          const result = await response.json();

          return setPaymentData(result);
        }
      } catch (err) {
        if (err.name === 'AbortError' || abortController.signal.aborted) {
          return;
        }
        setFetchErrorMsg('Gagal mengambil data dari server');
      }
    };
    fetchData();
    return () => abortController.abort();
  }, [filterParams]);

  useEffect(() => {
    if (fetchErrorMsg === '') {
      return;
    }
    const timeout = setTimeout(() => {
      setFetchErrorMsg('');
    }, 300);
    return () => clearTimeout(timeout);
  });

  return (
    <main>
      <FilterForm
        handleFilterButtonClick={handleFilterButtonClick}
        type="payment-data"
      />
      {fetchErrorMsg !== '' && <span>{fetchErrorMsg}</span>}
      <div className={styles.info}>
        <p>
          Menampilkan pembayaran{' '}
          {dateStart !== '' && dateEnd !== ''
            ? `dari ${format(dateStart, 'EEEE, dd-MMM-yyyy', { locale: id })} sampai ${format(dateEnd, 'EEEE, dd-MMM-yyyy', { locale: id })}`
            : dateStart !== ''
              ? `dari ${format(dateStart, 'EEEE, dd-MMM-yyyy', { locale: id })}`
              : dateEnd !== ''
                ? `sampai ${format(dateEnd, 'EEEE, dd-MMM-yyyy', { locale: id })}`
                : `dari ${format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'EEEE, dd-MMM-yyyy', { locale: id })} sampai ${format(endOfWeek(new Date(), { weekStartsOn: 1 }), 'EEEE, dd-MMM-yyyy', { locale: id })}`}
        </p>
      </div>
      <div className={styles['payment-data-wrapper']}>
        <div className={styles['payment-data-header']}>
          <h4>No Invoice</h4>
          <h4>Nama</h4>
          <h4>Nominal Pembayaran</h4>
          <h4>Metode Pembayaran</h4>
        </div>

        {paymentData.length > 0 &&
          paymentData.map((data) => {
            return (
              <div key={data.id} className={styles['payment-data-card']}>
                <p>{data.invoice.invoiceNumber}</p>
                <p>{data.invoice.customerName}</p>
                <p>{data.amountPaid}</p>
                <p>{data.method}</p>
              </div>
            );
          })}
      </div>
    </main>
  );
}

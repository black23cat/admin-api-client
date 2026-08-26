import { endOfMonth, format, startOfMonth } from 'date-fns';
import FilterForm from '../FilterForm/FilterForm';
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import PageNavigation from '../PageNavigation/PageNavigation';
import { id } from 'date-fns/locale';
import getFileDetails from '../../utils/getFileDetails';
import styles from './JobData.module.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function JobData() {
  const [jobData, setJobData] = useState([]);
  const [jobDataCount, setJobDataCount] = useState(null);
  const [fetchErrorMsg, setFetchErrorMsg] = useState('');
  const [filterParams, setFilterParams] = useSearchParams(
    `page=1&dateStart=&dateEnd=`,
  );

  const currentPage = Number(filterParams.get('page'));

  const handleFilterButtonClick = (filterData, reset = false) => {
    if (reset) {
      return setFilterParams({
        page: 1,
        dateStart: '',
        dateEnd: '',
      });
    }

    if (filterData.dateStart === '' && filterData.dateEnd !== '') {
      filterData.dateStart = startOfMonth(filterData.dateEnd, 'yyyy-MM-dd');
    } else if (filterData.dateStart !== '' && filterData.dateEnd === '') {
      filterData.dateEnd = endOfMonth(filterData.dateStart, 'yyyy-MM-dd');
    }

    const newUrlParams = { page: '1', filter: '1', ...filterData };
    setFilterParams(newUrlParams);
  };

  const handlePageNavigation = (navigate) => {
    if (navigate === 'prev') {
      return setFilterParams((prev) => {
        prev.set('page', currentPage - 1);
        return prev;
      });
    } else if (navigate === 'next') {
      return setFilterParams((prev) => {
        prev.set('page', currentPage + 1);
        return prev;
      });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/job-data?${filterParams}`, {
          signal: abortController.signal,
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const { jobData, jobDataCount } = await response.json();

          let currentDate;
          const groupedDate = jobData.map((item, index) => {
            if (
              index > 0 &&
              format(item.createdAt, 'dd-MM-yyyy') ===
                format(currentDate, 'dd-MM-yyyy')
            ) {
              return { ...item, createdAt: null };
            }
            currentDate = item.createdAt;
            return item;
          });
          setJobDataCount(jobDataCount);
          setJobData(groupedDate);
          return;
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

  const printLength = {
    eco: 0,
    'eco-bahan': 0,
    'sublim-press': 0,
    'sublim-bahan': 0,
  };

  const printLengthCount =
    jobData.length === 0
      ? printLength
      : jobData.reduce((acc, curr) => {
          curr.fileList.forEach((file) => {
            const { printHeight, printCount } = getFileDetails(file.filename);
            if (curr.poType === 'eco') {
              acc.eco += printHeight * printCount;
            } else if (curr.poType === 'ecoBahan') {
              acc['eco-bahan'] += printHeight * printCount;
            } else if (curr.poType === 'sublimPress') {
              acc['sublim-press'] += printHeight * printCount;
            } else if (curr.poType === 'sublim') {
              acc['sublim-bahan'] += printHeight * printCount;
            }
          });
          return acc;
        }, printLength);

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
        type="job-data"
      />
      {fetchErrorMsg !== '' && <span>{fetchErrorMsg}</span>}
      {jobData.length > 0 ? (
        <div className={styles['job-data-wrapper']}>
          <div className={styles['job-data-header']}>
            <h4>Hari / Tanggal</h4>
            <h4>Nama</h4>
            <h4>Data Pekerjaan</h4>
            <h4>Ukuran</h4>
            <h4>Jumlah</h4>
            <div className={styles['volume-wrapper']}>
              <h4>Volume</h4>
              <div>
                <h4>P</h4>
                <h4>PB</h4>
                <h4>PP</h4>
                <h4>PPB</h4>
              </div>
            </div>
          </div>
          {jobData.map((data) => {
            return <JobDataRow jobData={data} key={data.id} />;
          })}
          <div className={styles['table-footer']}>
            <h4>Total</h4>
            <p>
              Eco Solvent (Print) <span>: {printLengthCount.eco}</span>
            </p>
            <p>
              Eco Solvent (Print + Bahan){' '}
              <span>: {printLengthCount['eco-bahan']}</span>
            </p>
            <p>
              Sublim (Press) <span>: {printLengthCount['sublim-press']}</span>
            </p>
            <p>
              Sublim (Press + Bahan){' '}
              <span>: {printLengthCount['sublim-bahan']}</span>
            </p>
          </div>
        </div>
      ) : (
        <p>Tidak ada Data Pekerjaan....</p>
      )}
      <PageNavigation
        totalItemCount={jobDataCount}
        currentPage={currentPage}
        handlePageNavigation={handlePageNavigation}
      />
    </main>
  );
}

function JobDataRow({ jobData }) {
  return (
    <div className={styles['job-data-row']}>
      <p>
        {jobData.createdAt === null
          ? ''
          : format(jobData.createdAt, 'EEEE / dd', { locale: id })}
      </p>
      <p>{jobData.customerName}</p>

      <div className={styles['print-details']}>
        {jobData.fileList.map((file) => {
          const { filename, printWidth, printHeight, printCount } =
            getFileDetails(file.filename);
          return (
            <div className={styles['file-details']} key={file.id}>
              <p>{filename}</p>
              <p>{`${printWidth}x${printHeight}`}</p>
              <p>{printCount}</p>
              <div className={styles['print-length']}>
                {jobData.poType === 'eco' ? (
                  <>
                    <p>{printHeight * printCount}</p>
                    <p></p>
                    <p></p>
                    <p></p>
                  </>
                ) : jobData.poType === 'ecoBahan' ? (
                  <>
                    <p></p>
                    <p>{printHeight * printCount}</p>
                    <p></p>
                    <p></p>
                  </>
                ) : jobData.poType === 'sublimPress' ? (
                  <>
                    <p></p>
                    <p></p>
                    <p>{printHeight * printCount}</p>
                    <p></p>
                  </>
                ) : jobData.poType === 'sublim' ? (
                  <>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p>{printHeight * printCount}</p>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

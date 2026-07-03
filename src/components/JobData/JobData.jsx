import { endOfMonth, format, startOfMonth } from 'date-fns';
import FilterForm from '../FilterForm/FilterForm';
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import PageNavigation from '../PageNavigation/PageNavigation';
import { id } from 'date-fns/locale';

const API_URL = import.meta.env.VITE_API_URL;

export default function JobData() {
  const [jobData, setJobData] = useState([]);
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
          const result = await response.json();
          let currentDate;
          const groupedDate = result.map((item, index) => {
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

          return setJobData(groupedDate);
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
            const splittedFilename = file.filename.split('_');
            const printSize = splittedFilename[2].split('x');
            const printHeight = Number(printSize[1] / 100);
            const printCount =
              Number(splittedFilename[4].replace('x', '')) || 1;
            if (curr.poType === 'eco') {
              acc.eco += printHeight * printCount;
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
    <>
      <FilterForm
        handleFilterButtonClick={handleFilterButtonClick}
        type="job-data"
      />
      {fetchErrorMsg !== '' && <span>{fetchErrorMsg}</span>}
      {jobData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th scope="col" rowSpan={2} style={{ border: '1px solid red' }}>
                Hari / Tanggal
              </th>
              <th scope="col" rowSpan={2}>
                Nama
              </th>
              <th scope="col" rowSpan={2}>
                Data Pekerjaan
              </th>
              <th scope="col" rowSpan={2}>
                Ukuran
              </th>
              <th scope="col" rowSpan={2}>
                Jumlah
              </th>
              <th scope="col" colSpan={4}>
                Volume
              </th>
            </tr>
            <tr>
              <th>P</th>
              <th>PB</th>
              <th>PP</th>
              <th>PPB</th>
            </tr>
          </thead>
          <tbody>
            {jobData.map((data) => {
              return <JobDataRow jobData={data} key={data.id} />;
            })}
          </tbody>
          <tfoot>
            <tr>
              <th scope="col" colSpan={5}>
                Total
              </th>
              <td>{printLengthCount.eco}</td>
              <td>{printLengthCount['eco-bahan']}</td>
              <td>{printLengthCount['sublim-press']}</td>
              <td>{printLengthCount['sublim-bahan']}</td>
            </tr>
          </tfoot>
        </table>
      )}
      <PageNavigation
        currentPage={currentPage}
        handlePageNavigation={handlePageNavigation}
      />
    </>
  );
}

function JobDataRow({ jobData }) {
  return (
    <>
      <tr>
        <td rowSpan={jobData.fileList.length + 1}>
          {jobData.createdAt === null
            ? ''
            : format(jobData.createdAt, 'EEEE / dd', { locale: id })}
        </td>
        <td rowSpan={jobData.fileList.length + 1}>{jobData.customerName}</td>
        <td style={{ display: 'none' }}></td>
        <td style={{ display: 'none' }}></td>
        <td style={{ display: 'none' }}></td>
        <td style={{ display: 'none' }}></td>
        <td style={{ display: 'none' }}></td>
        <td style={{ display: 'none' }}></td>
        <td style={{ display: 'none' }}></td>
      </tr>
      {jobData.fileList.map((file) => {
        const splittedFilename = file.filename.split('_');
        const filename = `${splittedFilename[0]}_${splittedFilename[1]}_${splittedFilename[3]}`;
        const printSize = splittedFilename[2].split('x');
        const printWidth = Number(printSize[0] / 100);
        const printHeight = Number(printSize[1] / 100);
        const printCount = Number(splittedFilename[4].replace('x', '')) || 1;
        return (
          <tr key={file.id}>
            <td style={{ display: 'none' }}></td>
            <td style={{ display: 'none' }}></td>
            <td>{filename}</td>
            <td>{`${printWidth}x${printHeight}`}</td>
            <td>{printCount}x</td>
            {jobData.poType === 'eco' ? (
              <>
                <td>{printHeight * printCount}</td>
                <td></td>
                <td></td>
                <td></td>
              </>
            ) : jobData.poType === 'sublim' ? (
              <>
                <td></td>
                <td></td>
                <td></td>
                <td>{printHeight * printCount}</td>
              </>
            ) : (
              <></>
            )}
          </tr>
        );
      })}
    </>
  );
}

import { Page, Text, View, Document } from '@react-pdf/renderer';
import { styles } from './PoPrintStyles';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import getFileDetails from '../../utils/getFileDetails';

export default function PoPrint({ poData }) {
  return <DocumentContent poData={poData} />;
}

function DocumentContent({ poData, title }) {
  const fileListDetails = poData.fileList.map((file) => {
    return getFileDetails(file.filename);
  });
  const totalPrintLength = fileListDetails.reduce((acc, curr) => {
    return acc + curr.printHeight * curr.printCount;
  }, 0);

  return (
    <Document title={title}>
      <Page size="A4" style={styles.page}>
        {/* Table*/}
        <View style={styles.table}>
          {/* Table Heading */}
          <TableHeading poData={poData} />

          {/* Table Header */}
          <TableHeader />

          {/* Table Rows */}
          {fileListDetails.map((file, index) => (
            <TableRow key={index} data={file} />
          ))}
          <View style={[styles.tableRow, styles.poTableFooter]}>
            <Text style={styles.colDesc}>Total (M²)</Text>
            <Text style={styles.colPrintSize}></Text>
            <Text style={styles.colQty}></Text>
            <Text style={styles.colTotal}>{totalPrintLength}</Text>
            <Text style={styles.colNotes}></Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

function TableHeading({ poData }) {
  return (
    <>
      <View style={styles.tableHeading}>
        <Text>Data Pemesanan (PO)</Text>
      </View>
      <View style={styles.tableDetails}>
        <Text>Nama : {poData.customerName}</Text>
        <Text>
          Hari/Tangal :{' '}
          {format(poData.createdAt, 'EEEE / dd-MM-yyyy', { locale: id })}
        </Text>
      </View>
    </>
  );
}

function TableHeader() {
  return (
    <View style={[styles.tableRow, styles.tableHeader]}>
      <Text style={[styles.colDesc, styles.tableHeaderText]}>Nama File</Text>
      <Text style={[styles.colPrintSize, styles.tableHeaderText]}>Ukuran</Text>
      <Text style={[styles.colQty, styles.tableHeaderText]}>Jumlah Print</Text>
      <Text style={[styles.colTotal, styles.tableHeaderText]}>Jumlah (M²)</Text>
      <Text style={[styles.colNotes, styles.tableHeaderText]}>Keterangan</Text>
    </View>
  );
}

function TableRow({ data }) {
  return (
    <View style={styles.tableRow}>
      <Text style={styles.colDesc}>{data.filename}</Text>
      <Text
        style={styles.colPrintSize}
      >{`${data.printWidth} x ${data.printHeight}`}</Text>
      <Text style={styles.colQty}>{data.printCount}x</Text>
      <Text style={styles.colTotal}>{data.printHeight * data.printCount}</Text>
      <Text style={styles.colNotes}></Text>
    </View>
  );
}

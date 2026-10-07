import { PDFViewer, Document, Page } from '@react-pdf/renderer';
import { styles } from './InvoicePrintStyles';
import Header from './PdfComponent/MainInvoice/Header';
import Heading from './PdfComponent/MainInvoice/Heading';
import Table from './PdfComponent/MainInvoice/Table';
import SummaryRow from './PdfComponent/MainInvoice/SummaryRows';
import Footer from './PdfComponent/MainInvoice/Footer';
import { ThinBorder } from './PdfComponent/MainInvoice/Borders';
import CompanySign from './PdfComponent/MainInvoice/CompanySign';

export default function InvoicePrint({ invoiceData, title }) {
  const downPaymentTotal =
    invoiceData.paymentDetails.length === 0
      ? 0
      : invoiceData.paymentDetails.reduce(
          (total, payment) => total + payment.amountPaid,
          0,
        );
  return (
    <Document title={title}>
      <Page size="A4" style={styles.page}>
        <Header />
        <ThinBorder />
        <Heading invoiceData={invoiceData} />
        <Table invoiceData={invoiceData} />

        <SummaryRow
          invoiceData={invoiceData}
          downPaymentTotal={downPaymentTotal}
        />
        <CompanySign />
        <Footer />
      </Page>
    </Document>
  );
}

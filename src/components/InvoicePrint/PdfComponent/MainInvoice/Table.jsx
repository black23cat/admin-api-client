import { View } from '@react-pdf/renderer';
import { styles } from '../../InvoicePrintStyles';
import TableHeaders from './TableHeaders';
import MainTableRows from './MainTableRows';
import AdditionalItemRows from './AdditionalItemsRows';
import CashbackRow from './CashbackRows';

export default function Table({ invoiceData }) {
  return (
    <View style={styles.table}>
      <TableHeaders />
      <MainTableRows invoiceData={invoiceData} />
      <AdditionalItemRows invoiceData={invoiceData} />
      <CashbackRow invoiceData={invoiceData} />
    </View>
  );
}

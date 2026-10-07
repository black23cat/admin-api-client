import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../InvoicePrintStyles';
import formatter from '../../../../utils/formatter';

export default function CashbackRow({ invoiceData }) {
  return (
    <View
      style={
        invoiceData.nonPrintItems.length === 0 ||
        invoiceData.nonPrintItems.length % 2 === 0
          ? [styles.tableRow, styles.tableRowOdd]
          : styles.tableRow
      }
    >
      <Text style={[styles.colJobDetail, styles.textLeft]}>
        Cashback
        {invoiceData.cashbackNotes === null
          ? ''
          : `: ${invoiceData.cashbackNotes}`}
      </Text>
      <Text style={styles.colPrice}></Text>
      <Text style={styles.colVolume}></Text>
      <Text style={styles.colTotal}>
        {invoiceData.cashbackNotes === null
          ? '- Rp 0'
          : `- ${formatter.format(invoiceData.amount[0].cashbackAmount)}`}
      </Text>
    </View>
  );
}

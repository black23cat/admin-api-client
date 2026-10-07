import { View, Text } from '@react-pdf/renderer';
import { ThickBorder } from './Borders';
import { styles } from '../../InvoicePrintStyles';
import formatter from '../../../../utils/formatter';

export default function SummaryRow({ invoiceData, downPaymentTotal }) {
  return (
    <View style={styles.summaryWrapper}>
      <View style={styles.summaryLeft}>
        <View style={styles.paymentDetails}>
          <Text style={styles.boldText}>Informasi Pembayaran</Text>
          <View style={styles.invoiceData}>
            <Text style={styles.label}>Bank</Text>
            <Text style={styles.input}>: Bank BCA</Text>
          </View>
          <View style={styles.invoiceData}>
            <Text style={styles.label}>Atas Nama</Text>
            <Text style={styles.input}>: TOHIRIN</Text>
          </View>
          <View style={styles.invoiceData}>
            <Text style={styles.label}>No. Rekening </Text>
            <Text style={styles.input}>: 999 999 999 999</Text>
          </View>
        </View>
        <View>
          <Text style={styles.notes}>
            * Detail item print di halaman kedua{' '}
          </Text>
        </View>
      </View>
      <View style={styles.summaryRight}>
        <View>
          <View style={styles.summaryText}>
            <Text>Total</Text>
            <Text style={styles.boldText}>
              {formatter.format(invoiceData.amount[0].total)}
            </Text>
          </View>
          <View style={styles.summaryText}>
            <Text>Uang Muka</Text>
            <Text style={styles.boldText}>
              {formatter.format(downPaymentTotal)}
            </Text>
          </View>
          <ThickBorder />
          <View
            style={[styles.summaryText, styles.boldText, { marginTop: 10 }]}
          >
            <Text>Sisa Tagihan</Text>
            <Text
              style={[
                styles.companySubText,
                { fontSize: 12, letterSpacing: 0.6 },
              ]}
            >
              {formatter.format(invoiceData.amount[0].total)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

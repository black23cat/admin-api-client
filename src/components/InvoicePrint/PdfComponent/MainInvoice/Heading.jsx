import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../InvoicePrintStyles';
import { format } from 'date-fns';

export default function Heading({ invoiceData }) {
  return (
    <View>
      <View style={styles.invoiceDetails}>
        <View style={styles.invoiceLeftHeading}>
          <Text style={styles.invoiceHeading}>INVOICE</Text>
          <View
            style={[
              styles.invoiceData,
              styles.invoiceNumber,
              styles.companySubText,
            ]}
          >
            <Text>No. Invoice</Text>
            <Text>: {`INV/0${invoiceData.invoiceNumber || '0000'}`}</Text>
          </View>
        </View>

        <View style={styles.invoiceRightHeading}>
          <View style={styles.invoiceData}>
            <Text style={styles.label}>Nama Customer</Text>
            <Text style={styles.input}>
              : {invoiceData.customerName || 'No Name'}
            </Text>
          </View>
          <View style={styles.invoiceData}>
            <Text style={styles.label}>Tanggal</Text>
            <Text style={styles.input}>
              : {format(invoiceData.createdAt, 'dd/MM/yyyy')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../InvoicePrintStyles';

export default function TableHeaders() {
  return (
    <View style={[styles.tableRow, styles.tableHeader]}>
      <Text style={[styles.colJobDetail, styles.tableHeaderText]}>
        Jenis Pekerjaan
      </Text>

      <Text style={[styles.colPrice, styles.tableHeaderText]}>
        Harga Satuan
      </Text>
      <Text style={[styles.colVolume, styles.tableHeaderText]}>Vol(M³)</Text>
      <Text style={[styles.colTotal, styles.tableHeaderText]}>Jumlah</Text>
    </View>
  );
}

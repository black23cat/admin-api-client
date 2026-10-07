import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../InvoicePrintStyles';
import { decimalFormatter } from '../../../../utils/formatter';
import roundTotal from '../../../../utils/roundTotal';

export default function AdditionalItemRows({ invoiceData }) {
  return (
    <>
      <View style={styles.tableRow}>
        <Text style={[styles.colJobDetail, styles.textLeft]}>
          Item Lainnya (Non Print)
        </Text>
        <Text style={styles.colPrice}>
          {invoiceData.nonPrintItems.length === 0 ? '-' : ''}
        </Text>
        <Text style={styles.colVolume}>
          {invoiceData.nonPrintItems.length === 0 ? '-' : ''}
        </Text>
        <Text style={styles.colTotal}>
          {invoiceData.nonPrintItems.length === 0 ? '-' : ''}
        </Text>
      </View>
      {invoiceData.nonPrintItems.length > 0
        ? invoiceData.nonPrintItems.map((item, index) => {
            return (
              <View
                style={
                  index % 2 === 0
                    ? [styles.tableRow, styles.tableRowOdd]
                    : styles.tableRow
                }
                key={index}
              >
                <Text style={[styles.colJobDetail, styles.textLeft]}>
                  {item.itemName}
                </Text>
                <Text style={styles.colPrice}>
                  {decimalFormatter.format(item.pricePerItem)}
                </Text>
                <Text style={styles.colVolume}>{item.count}</Text>
                <Text style={styles.colTotal}>
                  {decimalFormatter.format(
                    roundTotal(item.pricePerItem * item.count),
                  )}
                </Text>
              </View>
            );
          })
        : null}
    </>
  );
}

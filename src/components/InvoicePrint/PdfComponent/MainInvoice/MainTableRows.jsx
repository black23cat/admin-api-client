import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../InvoicePrintStyles';
import formatter from '../../../../utils/formatter';
import roundTotal from '../../../../utils/roundTotal';

export default function MainTableRows({ invoiceData }) {
  return (
    <>
      <View
        style={
          invoiceData.printItemDetails[0].eco[0].totalLength > 0
            ? [styles.tableRow, styles.boldText]
            : styles.tableRow
        }
      >
        <Text style={[styles.colJobDetail, styles.textLeft]}>
          Print Eco Solvent
        </Text>
        <Text style={styles.colPrice}>
          {formatter.format(invoiceData.printItemDetails[0].eco[0].price)}
        </Text>
        <Text style={styles.colVolume}>
          {invoiceData.printItemDetails[0].eco[0].totalLength}
        </Text>
        <Text style={styles.colTotal}>
          {formatter.format(
            roundTotal(
              invoiceData.printItemDetails[0].eco[0].price *
                invoiceData.printItemDetails[0].eco[0].totalLength,
            ),
          )}
        </Text>
      </View>
      <View
        style={
          invoiceData.printItemDetails[0].ecoBahan[0].totalLength > 0
            ? [styles.tableRow, styles.tableRowOdd, styles.boldText]
            : [styles.tableRow, styles.tableRowOdd]
        }
      >
        <Text style={[styles.colJobDetail, styles.textLeft]}>
          Print Eco Solvent + Bahan
        </Text>
        <Text style={styles.colPrice}>
          {formatter.format(invoiceData.printItemDetails[0].ecoBahan[0].price)}
        </Text>
        <Text style={styles.colVolume}>
          {invoiceData.printItemDetails[0].ecoBahan[0].totalLength}
        </Text>
        <Text style={styles.colTotal}>
          {formatter.format(
            roundTotal(
              invoiceData.printItemDetails[0].ecoBahan[0].price *
                invoiceData.printItemDetails[0].ecoBahan[0].totalLength,
            ),
          )}
        </Text>
      </View>
      <View
        style={
          invoiceData.printItemDetails[0].sublimPress[0].totalLength > 0
            ? [styles.tableRow, styles.boldText]
            : styles.tableRow
        }
      >
        <Text style={[styles.colJobDetail, styles.textLeft]}>Print Sublim</Text>
        <Text style={styles.colPrice}>
          {formatter.format(
            invoiceData.printItemDetails[0].sublimPress[0].price,
          )}
        </Text>
        <Text style={styles.colVolume}>
          {invoiceData.printItemDetails[0].sublimPress[0].totalLength}
        </Text>
        <Text style={styles.colTotal}>
          {formatter.format(
            roundTotal(
              invoiceData.printItemDetails[0].sublimPress[0].price *
                invoiceData.printItemDetails[0].sublimPress[0].totalLength,
            ),
          )}
        </Text>
      </View>
      <View
        style={
          invoiceData.printItemDetails[0].sublim[0].totalLength > 0
            ? [styles.tableRow, styles.tableRowOdd, styles.boldText]
            : [styles.tableRow, styles.tableRowOdd]
        }
      >
        <Text style={[styles.colJobDetail, styles.textLeft]}>
          Print Sublim + Bahan
        </Text>
        <Text style={styles.colPrice}>
          {formatter.format(invoiceData.printItemDetails[0].sublim[0].price)}
        </Text>
        <Text style={styles.colVolume}>
          {invoiceData.printItemDetails[0].sublim[0].totalLength}
        </Text>
        <Text style={styles.colTotal}>
          {formatter.format(
            roundTotal(
              invoiceData.printItemDetails[0].sublim[0].price *
                invoiceData.printItemDetails[0].sublim[0].totalLength,
            ),
          )}
        </Text>
      </View>
    </>
  );
}

import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../InvoicePrintStyles';
import { ThinBorder } from './Borders';

export default function Footer() {
  return (
    <View style={styles.footer} fixed={true}>
      <ThinBorder />
      <View style={styles.footerContainer}>
        <View style={styles.footerLeft}>
          <Text>PolyGraphic — Sublim & Eco Solvent Printing </Text>
        </View>
      </View>
    </View>
  );
}

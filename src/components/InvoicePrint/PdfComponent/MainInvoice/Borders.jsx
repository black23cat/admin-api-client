import { View } from '@react-pdf/renderer';
import { styles } from '../../InvoicePrintStyles';

function DoubleBorder() {
  return (
    <View style={styles.borderContainer}>
      <ThinBorder />
      <ThickBorder />
    </View>
  );
}

function ThinBorder() {
  return <View style={styles.borderThin} />;
}

function ThickBorder() {
  return <View style={styles.borderThick} />;
}

export { DoubleBorder, ThinBorder, ThickBorder };

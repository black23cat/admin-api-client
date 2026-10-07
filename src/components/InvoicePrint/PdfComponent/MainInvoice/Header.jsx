import { View, Text, Image } from '@react-pdf/renderer';
import { styles } from '../../InvoicePrintStyles';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <View style={styles.companyDetailsWrapper}>
          <View>
            <Text
              style={{
                color: '#fff',
                padding: 10,
                marginRight: 5,
                fontWeight: 700,
                fontSize: 14,
                backgroundColor: '#242424',
                borderRadius: 5,
              }}
            >
              PG
            </Text>
          </View>
          <View style={styles.companyDetails}>
            <Text style={styles.companyMainText}>Polygrapic</Text>
            <Text style={styles.companySubText}>
              SUBLIM & ECO SOLVENT PRINTING
            </Text>
          </View>
        </View>
        <View style={styles.companyDescWrapper}>
          <Text style={styles.descMainText}>Printing Sublimasi</Text>
          <Text style={styles.descSubText}>
            Bahan Polyester: Sepatu, Kerudung, Tas, Bendera, Jersey, dan
            Lain-lain
          </Text>
        </View>
      </View>

      <View style={styles.headerRight}>
        <Text style={styles.companyName}>PT. Sukses Mulia</Text>
        <Text>
          Jl. Industri Tekstil No. 12, Area Kawasan Produksi, Kota Bandung
        </Text>
        <Text>
          Telp: [021-1234567](tel:0211234567) | Email: info@suksesmulia.com
        </Text>
      </View>
    </View>
  );
}

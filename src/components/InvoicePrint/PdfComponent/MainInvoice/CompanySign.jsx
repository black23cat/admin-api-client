import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../InvoicePrintStyles';

export default function CompanySign() {
  return (
    <View style={styles.companySignWrapper}>
      <View style={{ width: '70%' }}></View>
      <View
        style={{ width: '30%', height: 65, justifyContent: 'space-between' }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: '#475569',
          }}
        >
          Hormat Kami,
        </Text>
        <View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: '#bdbdbd',
              marginBottom: 5,
            }}
          ></View>
          <Text style={[styles.boldText, { textAlign: 'center' }]}>
            Polygraphic Printing
          </Text>
        </View>
      </View>
    </View>
  );
}

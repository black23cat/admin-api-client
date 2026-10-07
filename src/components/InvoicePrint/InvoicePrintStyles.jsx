import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    paddingTop: 55,
    paddingBottom: 55,
    paddingHorizontal: 55,
    lineHeight: 1.5,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 5,
    letterSpacing: 0.2,
  },

  headerLeft: {
    width: '60%',
  },
  companyDetailsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyDetails: {
    flexDirection: 'column',
    textAlign: 'left',
  },
  companyMainText: {
    fontSize: 18,
    fontWeight: 'extrabold',
    color: '#1a1a1a',
    paddingBottom: 10,
  },
  companySubText: {
    letterSpacing: 0.9,
    fontSize: 9,
    fontWeight: 600,
    color: '#2563EB',
  },
  companyDescWrapper: {
    marginTop: 4,
  },
  descMainText: {
    fontSize: 9,
    fontWeight: 700,
    color: '#505050',
  },
  descSubText: {
    fontSize: 8.5,
    color: '#475569',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },

  headerRight: {
    width: '35%',
    textAlign: 'right',
    fontSize: 8.5,
    color: '#475569',
  },

  companyName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },

  borderContainer: {
    marginBottom: 5,
    width: '100%',
  },
  borderThick: {
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  borderThin: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginBottom: 1.5,
  },
  invoiceDetails: {
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15,
  },
  invoiceHeading: {
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  invoiceLeftHeading: {
    width: '55%',
    letterSpacing: 0.5,
    textAlign: 'left',
  },
  invoiceRightHeading: {
    width: '45%',
    letterSpacing: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  invoiceData: {
    flexDirection: 'row',
  },
  label: {
    width: '38%',
    opacity: 0.9,
    fontSize: 9,
    color: '#475569',
  },
  input: {
    width: '50%',
    fontWeight: 600,
  },
  invoiceNumber: {
    alignSelf: 'flex-start',
    fontWeight: 600,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginVertical: 15,
  },
  tableHeader: {
    backgroundColor: '#252525',
  },
  tableHeaderText: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: '#ffffff',
    fontWeight: 800,
  },
  colJobDetail: {
    paddingLeft: 15,
    width: '55%',
    textAlign: 'left',
  },
  colPrice: {
    width: '15%',
    textAlign: 'right',
    flexWrap: 'wrap',
  },
  colVolume: { width: '10%', textAlign: 'center' },
  colTotal: { width: '20%', textAlign: 'right', paddingRight: 15 },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    alignItems: 'center',
    minHeight: 24,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  tableRowOdd: {
    backgroundColor: '#F8FAFC',
  },
  summaryWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
  },
  summaryLeft: {
    width: '40%',
  },
  summaryRight: {
    width: '60%',
    textAlign: 'right',
    padding: 15,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
  },
  paymentDetails: {
    fontSize: 8.5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 15,
    backgroundColor: '#F8FAFC',
    borderLeftWidth: 3,
    borderLeftColor: '#1E40AF',
    marginBottom: 10,
  },
  summaryText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  topRight: {
    textAlign: 'right',
    border: '1px solid red',
    alignSelf: 'flex-end',
  },
  companySignWrapper: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
  },

  boldText: {
    fontWeight: 700,
  },
  footer: {
    position: 'absolute',
    paddingHorizontal: 55,
    bottom: 45,
    left: 0,
    right: 0,
    fontSize: 8,
    color: '#555555',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLeft: {
    marginTop: 10,
    width: '50%',
    textAlign: 'left',
  },
  notes: {
    fontSize: 8,
    color: '#475569',
    fontStyle: 'italic',
  },
});

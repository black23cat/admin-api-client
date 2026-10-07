import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 15,
    lineHeight: 1.5,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#2e2e2e',
  },
  tableHeading: {
    width: '100%',
    height: 'auto',
    padding: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableDetails: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 5,
  },
  tableHeader: {
    backgroundColor: '#e2e2e2',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tableHeaderText: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: '#2e2e2e',
  },
  colDesc: { width: '53%', paddingLeft: 5 },
  colPrintSize: { width: '15%', textAlign: 'center' },
  colQty: { width: '12%', textAlign: 'center', paddingRight: 5 },
  colTotal: { width: '8%', textAlign: 'center' },
  colNotes: { width: '12%', textAlign: 'center' },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 6,
    alignItems: 'center',
    minHeight: 24,
  },
  poTableFooter: {
    backgroundColor: '#e2e2e2',
  },
});

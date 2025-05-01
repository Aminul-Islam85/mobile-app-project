import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: { padding: 16, backgroundColor: '#fff' },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      marginTop: 40,
    },
    monthText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    dateTabs: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    dateItem: {
      alignItems: 'center',
      marginHorizontal: 8,
    },
    dateLabel: {
      fontSize: 14,
      color: '#333',
    },
    dateNumber: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    activeText: {
      color: 'green',
    },
    activeLine: {
      height: 2,
      width: '100%',
      backgroundColor: 'green',
      marginTop: 4,
    },
    searchInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
      padding: 10,
      marginBottom: 16,
    },
    showScorers: {
      fontSize: 14,
      color: '#000',
      marginBottom: 16,
    },
    section: {
      marginTop: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    noData: {
      fontSize: 14,
      color: '#999',
      fontStyle: 'italic',
    },
    datePickerWebWrapper: {
      alignItems: 'flex-end',
      marginBottom: 10,
      position: 'relative',
    },
    datePickerWebButton: {
      padding: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
    },
  });
  
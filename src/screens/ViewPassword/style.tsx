import { StyleSheet } from 'react-native'; 

export default StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#d7e7e8',
      borderRadius: 8,
      paddingHorizontal: 12,
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
      height: 40,
      color: '#000',
    },
    searchIcon: {
      marginLeft: 8,
    },
    list: {
      paddingBottom: 16,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#d7e7e8',
      padding: 16,
      borderRadius: 8,
      marginBottom: 8,
    },
    itemTitle: {
      color: '#000',
      fontSize: 16,
      fontWeight: 'bold',
    },
    addButton: {
      backgroundColor: '#2c252f',
      borderRadius: 50,
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
      position: 'absolute',
      bottom: 16,
      right: 16,
    },
  });
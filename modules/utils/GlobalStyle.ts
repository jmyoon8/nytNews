import { StyleSheet } from 'react-native';
import { CFFF } from './GolobalColors';

export const globalStyles = StyleSheet.create({
   welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
   },
   container: {
      backgroundColor: CFFF,
      height: '100%',
      paddingHorizontal: 12,
      paddingTop: 20,
   },
});

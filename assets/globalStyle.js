import { StyleSheet } from 'react-native';
import COLORS from '../src/const/colors';

const globalStyles = StyleSheet.create({
  hongkong: {
    fontFamily: 'HongKongRegular',
  },
  white: {
    color: COLORS.white,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    flex: 1,
    width: '100%'
  },
  title: {
      fontSize: 30,
      fontFamily: 'Broadway',
  },
  borderBottom:{
    borderWidth: 1,
    borderRightWidth:0,
    borderLeftWidth:0,
    borderTopWidth:0,
    borderBottomColor: COLORS.white,
  }
});

export default globalStyles;
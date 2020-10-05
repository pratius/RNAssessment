import {StyleSheet, StatusBar, Platform} from 'react-native';

const styles = StyleSheet.create({
  screen: {
    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
   flex:1,
  },
});

export default styles;

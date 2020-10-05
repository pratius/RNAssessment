import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    height: '40%',
    width: '40%',
  },
  containerView: {
    backgroundColor: '#3900E6',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    height: '25%',
    width: '40%',
    borderRadius: 15,
  },
  activatedView: {
    backgroundColor: '#34D45F',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    height: '25%',
    width: '40%',
    borderRadius: 15,
  },
  text: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  indicator: {
    alignSelf: 'center',
    height: 20,
    width: 20,
  },
  buttonImage: {
    alignSelf: 'center',
    height: 20,
    width: 20,
  },
});

export default styles;

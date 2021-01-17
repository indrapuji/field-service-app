import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
    // backgroundColor: 'white',
  },
  loginLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSize: {
    width: 250,
  },
  contentPosition: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  textMargin: {
    alignItems: 'center',
    marginTop: 10,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textVersi: {
    fontSize: 13,
    color: 'red',
  },
  inputSize: {
    width: width / 1.12,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  inputPosition: {
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    top: 13,
    right: 20,
  },
  buttonSize: {
    width: width / 1.12,
    height: 50,
    backgroundColor: '#3528e9',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
    justifyContent: 'center',
  },
});

export default styles;

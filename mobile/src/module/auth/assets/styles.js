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
  modalPosition: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 35,
    width: 300,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 20,
    borderRadius: 20,
    width: 150,
    height: 40,
    elevation: 2,
    justifyContent: 'center',
    marginHorizontal: 20,
    backgroundColor: 'red',
  },
});

export default styles;

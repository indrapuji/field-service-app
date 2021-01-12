import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    position: 'relative',
    marginHorizontal: 20,
  },
  content: {
    position: 'absolute',
    bottom: 100,
  },
  headerText: {
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
  },
});

export default styles;

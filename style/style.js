import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f#f5f5f5',
    fontFamily: "verdana",
    height: '100%',
  },
  scrollV: {
    height: "100%",
  },
  header: {
    backgroundColor: 'black',
    marginTop: 10,
    flexDirection: 'row'
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'black',
    flexDirection: 'row',
  },
  title: {
    color: '#f5f5f5',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#f5f5f5',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
  gamevalue: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  flex: {
    flexDirection: "row",
    paddingVertical: 15,
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "black",
    width: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#f5f5f5",
    fontSize: 20
  },
  numbers: {
    flexDirection: 'column',
  },
  nbrSum: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18
  },
  dropShadow: {
    marginVertical: 10,
    paddingHorizontal: 18,
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  }
});
const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF7F50',
    justifyContent: 'center',
    height: '100%',
    padding: 50
  },
  listContainer: {
    backgroundColor: '#FF7F50',
    flex: 1
  },
  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#FF7F50',
    borderBottomColor: '#FF7F50',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 50,
    flexDirection: 'row',
    width: '100%'
  },
  navbarTitle: {
    flex: 2,
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center'

  },
  statusbar: {
    backgroundColor: '#FF7F50',
    height: 22,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 35,
    textAlign: 'center',
    paddingTop: 50,
  },
  action: {
    backgroundColor: '#444',
    borderColor: '#FF7F50',
    borderWidth: 1,
    height: 170,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  form: {
    backgroundColor: '#FF7F50'
  },
  title: {
    color: '#444',
    fontSize: 35,
    fontWeight: "500",
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
    padding: 20
  },
  inputStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    color: '#262626',
    fontSize: 18,
    fontWeight: '200',
    flex: 1,
    height: 40
  },
  containerStyle: {
    height: 60,
    flexDirection: 'column',
    width: '100%',
    borderColor: '#D4D4D4',
    borderBottomWidth: 1,
  },
  errorTextStyle: {
    color: '#E64A19',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  alignRight: {
    flex: 1
  }
})
module.exports = styles
module.exports.constants = constants;

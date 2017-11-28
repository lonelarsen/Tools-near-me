import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import StatusBar from './StatusBar';
import ActionButton from './ActionButton';
import styles from '../styles';
import ListItem from './ListItem';

const {
  AsyncStorage,
  ListView,
  StyleSheet,
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableHighlight,
  Alert
} = ReactNative;

class FindTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('items');
  }
  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      Alert.alert('Log Out Successfully!');
      Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  getRef() {
    return firebase.database().ref();
  }
  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }
  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.listContainer} behavior="padding" >
        <StatusBar onPress={this.userLogout.bind(this)} title="Tools Near Me" />

        <ActionButton onPress={this._findTool.bind(this)} title="Find tool" />
        <ActionButton onPress={this._allTools.bind(this)} title="All tools" />
        <ActionButton onPress={this._createAd.bind(this)} title="Create ad" />
        <ActionButton onPress={this._settings.bind(this)} title="Settings" />

      </KeyboardAvoidingView>


    )
  }

  _findTool() {
    Alert.alert('Pressed!');
    Actions.FindTool();
  }

  _allTools() {
    Alert.alert('Pressed!');
    Actions.AllTools();
  }

  _createAd() {
    Alert.alert('Pressed!');
    Actions.CreateAd();
  }

  _settings() {
    Alert.alert('Pressed!');
    Actions.Settings();
  }

  _addItem() {
    this.itemsRef.push({ title: this.state.text });
  }
  _renderItem(item) {
    const onPress = () => {
      Alert.alert(
        'Delete: '+item.title+'?',
        null,
        [
          {text: 'Yes', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ],
        {cancelable: false}
      );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }
}
module.exports = FindTool;

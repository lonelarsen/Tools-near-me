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

class AllTools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cates: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('items');
    this.cateRef = this.getRef().child('categories');
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
  listenForItems(cateRef) {
    cateRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          name: child.val().name,
          _key: child.key
        });
      });
      this.setState({
        cates: items
      });
    });
  }
  componentDidMount() {
    this.listenForItems(this.cateRef);
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.listContainer} behavior="padding" >
        <StatusBar onPress={this.userLogout.bind(this)} title="Tools Near Me" />
        <ListView style={styles.listWrapper}
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
        />
        <View style={styles.cateWrapper}>
        {this.state.cates.map(button => (
          <ActionButton onPress={this.filterTools.bind(this, button._key)} title={button.name} />
        ))}
        </View>
      </KeyboardAvoidingView>


    )
  }

  filterTools(key) {
    this.itemsRef.child(key).once('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().name,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  _listItemGardening() {
    Alert.alert('Pressed!');
    Actions.ListItemGardening();
  }

  _listItemElectrical() {
    Alert.alert('Pressed!');
    Actions.ListItemElectrical();
  }

  _listItemPlumbing() {
    Alert.alert('Pressed!');
    Actions.ListItemPlumbing();
  }

  _listItemInterior() {
    Alert.alert('Pressed!');
    Actions.ListItemInterior();
  }

  _listItemOther() {
    Alert.alert('Pressed!');
    Actions.ListItemOther();
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
module.exports = AllTools;

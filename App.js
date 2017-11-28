import React, {Component} from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import * as firebase from 'firebase';
import Authentication from './components/Authentication';
import HomePage from './components/HomePage';
import FindTool from './components/FindTool';
import CreateAd from './components/CreateAd';
import AllTools from './components/AllTools';
// import ListItem from './components/ListItem';
// import ListItemPlumbing from './components/ListItemPlumbing';
// import ListItemElectrical from './components/ListItemElectrical';
// import ListItemInterior from './components/ListItemInterior';
// import ListItemOther from './components/ListItemOther';


const firebaseConfig = {
  apiKey: "AIzaSyDLFqPZEXt-878mrC_0cq0h7agCJk-hxkY",
  authDomain: "awesome-project-7acf2.firebaseapp.com",
  databaseURL: "https://awesome-project-7acf2.firebaseio.com",
  projectId: "awesome-project-7acf2",
  storageBucket: "awesome-project-7acf2.appspot.com",
  messagingSenderId: "253143440492"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
console.ignoredYellowBox = [
  "Setting a timer"
];

export default class App extends Component {
  constructor() {
    super();
    this.state = { hasToken: false, isLoaded: false };
  }
  componentWillMount() {
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true });
    });
  }
  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else {
      return (
        <Router>
          <Scene key='root'>
            <Scene
              component={Authentication}
              hideNavBar={true}
              initial={!this.state.hasToken}
              key='Authentication'
              title='Authentication'
            />
            <Scene
              component={HomePage}
              hideNavBar={true}
              initial={this.state.hasToken}
              key='HomePage'
              title='Home Page'
            />
          <Scene
            component={FindTool}
            hideNavBar={true}
            initial={this.state.hasToken}
            key='FindTool'
            title='Find Tool'
          />
          <Scene
            component={CreateAd}
            hideNavBar={true}
            initial={this.state.hasToken}
            key='CreateAd'
            title='Create Ad'
          />
          <Scene
            component={AllTools}
            hideNavBar={true}
            initial={this.state.hasToken}
            key='AllTools'
            title='All Tools'
          />
        </Scene>
        </Router>
      );
    }
  }
}

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { Button } from 'react-native-elements';

import SignUp from './components/signup';
import SignIn from './components/signin';

var config = {
    apiKey: "AIzaSyDE11onLcKRE4gShjeuCT23dQprsZOUDCU",
    authDomain: "react-native-advanced-concepts.firebaseapp.com",
    databaseURL: "https://react-native-advanced-concepts.firebaseio.com",
    projectId: "react-native-advanced-concepts",
    storageBucket: "react-native-advanced-concepts.appspot.com",
    messagingSenderId: "848314432514"
};
firebase.initializeApp(config);

export default class App extends React.Component {
  state = { phone: '', user: '' };

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  setPhoneNumber = (number) => {
    this.setState({ phone: number });
  }

  currentView(){
    if(this.state.user){
      return (
        <View style={[styles.container, {justifyContent: 'center'}]}>
          <Text style={{ marginBottom: 10 }}>You're Logged In!</Text>
          <Button
            title = 'Sign Out'
            onPress = {() => firebase.auth().signOut()}
          />
        </View>
      )
    }
    else {
      return (
        <View style={[styles.container, {marginTop: 40}]}>
          <SignUp setPhoneNumber = {this.setPhoneNumber} />
          <SignIn phone = {this.state.phone} />
        </View>
      )
    }
  }

  render() {
    return this.currentView();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

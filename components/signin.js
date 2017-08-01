import React, { Component } from 'react';
import { View, Text, Keyboard } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-react-native-advanced-concepts.cloudfunctions.net/';

class SignIn extends Component {
  constructor(props){
    super(props);

    this.state = { phone: '', code: '', error: '' };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.phone != this.props.phone){
      this.setState({ phone: nextProps.phone });
    }
  }

  onSubmit = async () => {
    const { phone, code } = this.state;
    Keyboard.dismiss();
    try {
      let { data } = await axios.post(ROOT_URL + 'loginWithPass', { phone, code });
      firebase.auth().signInWithCustomToken(data.token);
    } catch (err) {
      return this.setState({ error: 'Something went wrong!' });
    }
    this.setState({ error: '' });
  }

  render(){
    return (
      <Card>
        <FormLabel>Phone number:</FormLabel>
        <FormInput
          value = {this.state.phone}
          keyboardType = 'phone-pad'
          onBlur = {() => this.setState({error: ''})}
          onFocus = {() => this.setState({error: ''})}
          onChangeText = {(text) => this.setState({ phone: text })}
        />
        <FormLabel>Passcode:</FormLabel>
        <FormInput
          value = {this.state.code}
          keyboardType = 'numeric'
          onBlur = {() => this.setState({error: ''})}
          onFocus = {() => this.setState({error: ''})}
          onChangeText = {(text) => this.setState({ code: text })}
        />
        <FormValidationMessage>{ this.state.error }</FormValidationMessage>
        <Button
          title="Sign In"
          backgroundColor = '#00c400'
          onPress = { this.onSubmit }
        />
      </Card>
    )
  }
}

export default SignIn;
import React, { Component } from 'react';
import { View, Text, Keyboard } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-react-native-advanced-concepts.cloudfunctions.net/';

class SignUp extends Component {
  state = { phone: '', error: '' };

  onSubmit = async () => {
    const phone = this.state.phone;
    Keyboard.dismiss();
    try {
      await axios.post(ROOT_URL + 'createUser', { phone });
      await axios.post(ROOT_URL + 'reqOneTimePass', { phone });
    } catch (err) {
      return this.setState({ error: 'Something went wrong!'});
    }
    this.props.setPhoneNumber(phone);
    this.setState({ error: '' })
  }

  render(){
    return (
      <Card>
        <FormLabel>Enter a cell number:</FormLabel>
        <FormInput
          value = {this.state.phone}
          keyboardType = 'phone-pad'
          onChangeText = {(text) => this.setState({ phone: text })}
        />
        <FormValidationMessage>{ this.state.error }</FormValidationMessage>
        <Button
          title="Sign Up / Get Passcode"
          backgroundColor = '#0080ff'
          onBlur = {() => this.setState({error: ''})}
          onFocus = {() => this.setState({error: ''})}
          onPress = { this.onSubmit }
        />
      </Card>
    )
  }
}

export default SignUp;
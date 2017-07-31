import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';

class SignIn extends Component {
  render(){
    return (
      <Card>
        <FormLabel>Phone number:</FormLabel>
        <FormInput />
        <FormLabel>Passcode:</FormLabel>
        <FormInput />
        <Button
          title="Sign In"
        />
      </Card>
    )
  }
}

export default SignIn;
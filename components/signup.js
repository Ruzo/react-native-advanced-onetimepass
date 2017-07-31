import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';

class SignUp extends Component {
  render(){
    return (
      <Card>
        <FormLabel>Enter a cell number:</FormLabel>
        <FormInput />
        <Button
          title="Sign Up / Get Passcode"
        />
      </Card>
    )
  }
}

export default SignUp;
import React, { Component } from 'react';
import { View, AsyncStorage } from "react-native";
import LoginUI from "./LoginUI";

interface ILoginUIState {
  user: any
}
interface ILoginUIProps {
  navigation: any
}
class LoginScreen extends Component<ILoginUIProps, ILoginUIState> {
  constructor(props: ILoginUIProps) {
    super(props);
    this.state = {
      user: null
    }
  }
  async componentDidMount() {
    let user = await AsyncStorage.getItem("userInfo")
    if (user) {
      this.props.navigation.navigate("AppStack")
    }
    else {
      this.setState({ user })
    }
  }
  onProfileComplete = () => {
    this.props.navigation.navigate("AppStack")
  }

  render() {
    if (!this.state.user)
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LoginUI onProfileComplete={this.onProfileComplete} />
        </View>
      );
    else
      return null
  }

}

export default LoginScreen;

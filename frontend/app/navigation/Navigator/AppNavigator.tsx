import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ModalNavigator from "./ModalNavigator";
import MethodologyModalNavigator from "./MethodologyModalNavigator";
import RootNavigator from "./RootNavigator";
import ComingSoonScreen from "../../screens/ComingSoon";
import Methodology from "../../screens/Methodology";
import LoginScreen from "../../screens/Login";
import PostEditScreen from "../../screens/PostEdit";
import auth from "../../utils/services/AuthService";

const AppStack = createStackNavigator();
(global as any).navigationRef = React.createRef();

class App extends React.Component {
  state = {
    token: undefined
  }

  async componentDidMount() {
    let token = await auth.getToken();
    (global as any).userData = await auth.getUserData();
    this.setState({ token });
  }

  render() {
    if (this.state.token === undefined) { // Do not render anything without deciding is user logged in or not. 
      return null;
    }
    return (
      <NavigationContainer ref={(global as any).navigationRef}>
        <AppStack.Navigator
          mode="modal"
          initialRouteName={this.state.token ? "AppStack" : "Login"}
        >
          <AppStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name="AppStack"
            component={RootNavigator}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name="ComingSoon"
            options={ComingSoonScreen.navigationOptions}
            component={ModalNavigator}
          />
          <AppStack.Screen
            name="Methodology"
            options={Methodology.navigationOptions}
            component={MethodologyModalNavigator}
          />
          <AppStack.Screen
            name="PostEdit"
            options={PostEditScreen.navigationOptions}
            component={PostEditScreen}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

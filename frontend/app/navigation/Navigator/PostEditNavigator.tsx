import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostEditScreen from "../../screens/PostEdit";

const Stack = createStackNavigator();

const MethodologyModalNavigator = (): React.ReactElement => (
    <Stack.Navigator>
        <Stack.Screen
            name="PostEdit"
            options={PostEditScreen.navigationOptions}
            component={PostEditScreen}
        />
    </Stack.Navigator>
);

export default MethodologyModalNavigator;

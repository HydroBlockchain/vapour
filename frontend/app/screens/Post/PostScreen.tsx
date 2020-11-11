import React, { useState } from "react";
import { View, SafeAreaView, } from "react-native";
import navigationOptions from "./PostScreen.navigationOptions";
import Loader from "../../components/Loader";
import { navigate } from "../../navigation";
import PostItem from "./PostItem";
import { ScrollView } from "react-native-gesture-handler";
import { withLocalization } from "../../utils";

const PostScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigator = navigate(props.navigation);
  // console.log(navigator, "navigator")
  if (isLoading)
    return <Loader isShow={true} />
  else
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ flexDirection: 'column', flex: 1 }} >
            <PostItem />
            <PostItem />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
};

PostScreen.navigationOptions = navigationOptions;

export default withLocalization(PostScreen);
import React, { useState } from "react";
import { View, SafeAreaView, } from "react-native";
import navigationOptions from "./NewsFeed.navigationOptions";
import Loader from "../../components/Loader";
import NewsFeedList from './NewsFeedList';
import { navigate } from "../../navigation";

const NewsFeed = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigator = navigate(props.navigation);
  console.log(navigator,"navigator")
  if (isLoading)
    return <Loader isShow={true} />
  else
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: "3%",
        }}
      >
        <View style={{ flex: 1 }}>
          <NewsFeedList onNewsPress={(newItem) => navigator.openNewsDetail(newItem)} />
        </View>
      </SafeAreaView>
    );
};

NewsFeed.navigationOptions = navigationOptions;

export default NewsFeed;
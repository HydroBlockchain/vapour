import React, { useState } from "react";
import { View, SafeAreaView, } from "react-native";
import navigationOptions from "./NewsDetail.navigationOptions";
import Loader from "../../components/Loader";
import NewsDetailView from './NewsDetailView';

const NewsDetail = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(props?.route?.params)
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
          <NewsDetailView newDetail={props?.route?.params} />
        </View>
      </SafeAreaView>
    );
};

NewsDetail.navigationOptions = navigationOptions;

export default NewsDetail;
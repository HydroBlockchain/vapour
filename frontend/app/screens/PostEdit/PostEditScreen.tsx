import React from "react";
import { ScrollView, View, Dimensions } from "react-native";
import navigationOptions from "./PostEditScreen.navigationOptions";
import RichTextBox from './RichTextBox'
import PostEdit from "./PostEdit";

const PostEditScreen = () => {
    return (
        <ScrollView >
            <PostEdit />
        </ScrollView>
    );
};

PostEditScreen.navigationOptions = navigationOptions;

export default PostEditScreen;

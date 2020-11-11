import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "../../components";
import { t } from "../../utils";
import { Colors } from "../../style";
import { ComponentsStyle } from "../../style";
import { useNavigation } from "@react-navigation/native";
import { navigate } from "../../navigation";

const navigationOptions = (props) => {
  const navigator = navigate(props.navigation);
  return (
    {
      ...ComponentsStyle.transitionBetweenScreenPresets,
      headerStyle: {
        ...ComponentsStyle.header
      },
      headerBackTitleVisible: false,
      headerTintColor: Colors.grey100,
      headerRight: () => (
        <TouchableOpacity onPress={navigator.openPostEdit} style={{ backgroundColor: Colors.blue50, padding: 5, marginRight: 15, borderRadius: 8 }}>
          <Text.Primary white style={{ fontSize: 15, paddingHorizontal: 5 }}>{t("POST_SCREEN_ADD_NEW")}</Text.Primary>
        </TouchableOpacity>
      ),
      headerTitle: () => <Text.H1>{t("POST_SCREEN_TITLE")}</Text.H1>,
    }
  )
};

export default navigationOptions;


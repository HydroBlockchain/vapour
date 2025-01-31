import { StyleSheet } from "react-native";
import { Colors, Layout } from "../../style";

const styles = StyleSheet.create({
  container: {
    ...Layout.containerWithPadding,
  },
  intro: {
    paddingTop: 30,
  },
  carbonIntensityContainer: {
    flexDirection: "row",
  },
  carbonIntensity: {
    paddingVertical: 20,
  },
  scrollContainer: {
    borderTopColor: Colors.blue10,
    borderTopWidth: 2,
  },
});

export default styles;

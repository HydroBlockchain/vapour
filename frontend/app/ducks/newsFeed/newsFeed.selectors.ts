import { pathOr } from "ramda";
import { ElectricityEnum } from "carbon-footprint";
import { namespace } from "./newsFeed.slice";

// const getAcceptedTermsOfUseVersion = (state) =>
//   pathOr(0, [namespace, "acceptedTermsOfUseVersion"], state);

const getLocation = (state) =>
  pathOr(ElectricityEnum.world, [namespace, "location"], state);

export default { getLocation };

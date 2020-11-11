/* SCREENS */
import * as Act from "../../screens/Act/translations";
import * as Budget from "../../screens/Budget/translations";
import * as Emissions from "../../screens/Emissions/translations";
import * as Settings from "../../screens/Settings/translations";
import * as MonthlyBudget from "../../screens/MonthlyBudget/translations";
import * as ComingSoon from "../../screens/ComingSoon/translations";
import * as Methodology from "../../screens/Methodology/translations";
import * as AddEmission from "../../screens/AddEmission/translations";
import * as EmissionItem from "../../screens/EmissionItem/translations";
import * as Intro from "../../screens/Intro/translations";
import * as About from "../../screens/About/translations";
import * as SupportUs from "../../screens/SupportUs/translations";
import * as MyLocation from "../../screens/MyLocation/translations";
import * as ActDetail from "../../screens/ActDetail/translations";
import * as Photos from "../../screens/Photos/translations";
import * as NewsFeed from "../../screens/NewsFeed/translations";
import * as NewsDetail from "../../screens/NewsDetail/translations";
import * as Profile from "../../screens/Profile/translations";
import * as Post from "../../screens/Post/translations";
import * as PostEdit from "../../screens/PostEdit/translations";

/* COMPONENTS */
import * as NoEmission from "../../components/NoEmission/translations";

/* UTILS */
import * as UI from "../../utils/ui/translations";

const en = {
  ...UI.en,
  ...About.en,
  ...MonthlyBudget.en,
  ...NoEmission.en,
  ...Act.en,
  ...Budget.en,
  ...Emissions.en,
  ...Settings.en,
  ...ComingSoon.en,
  ...Methodology.en,
  ...AddEmission.en,
  ...EmissionItem.en,
  ...Intro.en,
  ...SupportUs.en,
  ...MyLocation.en,
  ...ActDetail.en,
  ...Photos.en,
  ...NewsFeed.en,
  ...NewsDetail.en,
  ...Profile.en,
  ...Post.en,
  ...PostEdit.en,
};

const de = {
  ...UI.de,
  ...About.de,
  ...MonthlyBudget.de,
  ...NoEmission.de,
  ...Act.de,
  ...Budget.de,
  ...Emissions.de,
  ...Settings.de,
  ...ComingSoon.de,
  ...Methodology.de,
  ...AddEmission.de,
  ...EmissionItem.de,
  ...Intro.de,
  ...SupportUs.de,
  ...MyLocation.de,
  ...ActDetail.de,
  ...Photos.de,
  ...NewsFeed.de,
  ...NewsDetail.de,
  ...Profile.de,
  ...Post.de,
  ...PostEdit.de,
};

const fr = {
  ...UI.fr,
  ...About.fr,
  ...MonthlyBudget.fr,
  ...NoEmission.fr,
  ...Act.fr,
  ...Budget.fr,
  ...Emissions.fr,
  ...Settings.fr,
  ...ComingSoon.fr,
  ...Methodology.fr,
  ...AddEmission.fr,
  ...EmissionItem.fr,
  ...Intro.fr,
  ...SupportUs.fr,
  ...MyLocation.fr,
  ...ActDetail.fr,
  ...Photos.fr,
  ...NewsFeed.fr,
  ...NewsDetail.fr,
  ...Profile.fr,
  ...Post.fr,
  ...PostEdit.fr,
};

const sv = {
  ...UI.sv,
  ...About.sv,
  ...MonthlyBudget.sv,
  ...NoEmission.sv,
  ...Act.sv,
  ...Budget.sv,
  ...Emissions.sv,
  ...Settings.sv,
  ...ComingSoon.sv,
  ...Methodology.sv,
  ...AddEmission.sv,
  ...EmissionItem.sv,
  ...Intro.sv,
  ...SupportUs.sv,
  ...MyLocation.sv,
  ...ActDetail.sv,
  ...Photos.sv,
  ...NewsFeed.sv,
  ...NewsDetail.sv,
  ...Profile.sv,
  ...Post.sv,
  ...PostEdit.sv,
};

const pt = {
  ...UI.pt,
  ...About.pt,
  ...MonthlyBudget.pt,
  ...NoEmission.pt,
  ...Act.pt,
  ...Budget.pt,
  ...Emissions.pt,
  ...Settings.pt,
  ...Methodology.pt,
  ...AddEmission.pt,
  ...EmissionItem.pt,
  ...Intro.pt,
  ...SupportUs.pt,
  ...MyLocation.pt,
  ...ActDetail.pt,
  ...Photos.pt,
  ...NewsFeed.pt,
  ...NewsDetail.pt,
  ...Profile.pt,
  ...Post.pt,
  ...PostEdit.pt,
};

const es = {
  ...UI.es,
  ...About.es,
  ...MonthlyBudget.es,
  ...NoEmission.es,
  ...Act.es,
  ...Budget.es,
  ...Emissions.es,
  ...Settings.es,
  ...Methodology.es,
  ...AddEmission.es,
  ...EmissionItem.es,
  ...Intro.es,
  ...SupportUs.es,
  ...MyLocation.es,
  ...ActDetail.es,
  ...Photos.es,
  ...NewsFeed.es,
  ...NewsDetail.es,
  ...Profile.es,
  ...Post.es,
  ...PostEdit.es,
};

export interface TranslationKeys
  extends UI.TranslationKeys,
  MonthlyBudget.TranslationKeys,
  NoEmission.TranslationKeys,
  Act.TranslationKeys,
  Budget.TranslationKeys,
  Emissions.TranslationKeys,
  ComingSoon.TranslationKeys,
  Methodology.TranslationKeys,
  AddEmission.TranslationKeys,
  EmissionItem.TranslationKeys,
  Settings.TranslationKeys,
  Intro.TranslationKeys,
  About.TranslationKeys,
  MyLocation.TranslationKeys,
  SupportUs.TranslationKeys,
  ActDetail.TranslationKeys,
  Photos.TranslationKeys,
  NewsFeed.TranslationKeys ,
  NewsDetail.TranslationKeys ,
  Profile.TranslationKeys ,
  Post.TranslationKeys ,
  PostEdit.TranslationKeys { }

export { en, de, fr, sv, pt, es };

import { combineReducers } from "@reduxjs/toolkit";
import emissions from "../ducks/emissions";
import budget from "../ducks/budget";
import newsFeed from "../ducks/newsFeed";
import userPreferences from "../ducks/userPreferences";

const rootReducer = combineReducers({
  emissions: emissions.reducer,
  budget: budget.reducer,
  userPreferences: userPreferences.reducer,
  newsFeed: newsFeed.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

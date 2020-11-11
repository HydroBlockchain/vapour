import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ElectricityEnum } from "carbon-footprint";

const initialState = {
  acceptedTermsOfUseVersion: 0,
  newsFeed:[],
};

export const API_KEY = "apiKey=a8f31bc8eb22494a844c62dbc7b72b55";
//export const API_KEY = "apiKey=9b8ae4c402f14b768ad657a53fdc96dd"; // MY
export const URL = "https://newsapi.org/v2/everything?";


const newsFeed = createSlice({
  name: "newsFeed",
  initialState,
  reducers: {
    setNews(state, action: PayloadAction<object[]>) {
      state.newsFeed = action.payload;
    },
  },
});



const {  setNews } = newsFeed.actions;

export const actions = {  setNews };

export const namespace = newsFeed.name;

export const reducer = newsFeed.reducer;

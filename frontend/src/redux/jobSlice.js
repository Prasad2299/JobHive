import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobText: "",
    allAppliedJobs: [],
    searchQuery: "",
  },
  reducers: {
    //actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobText: (state, action) => {
      state.searchJobText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobText,
  setAllAppliedJobs,
  setSearchQuery,
} = jobSlice.actions;
export default jobSlice.reducer;

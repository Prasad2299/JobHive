import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    singleCompany: null,
    searchCompanyText: "",
  },
  reducers: {
    //actions
    setCompanies: (state, actions) => {
      state.companies = actions.payload;
    },
    setSingleCompany: (state, actions) => {
      state.singleCompany = actions.payload;
    },
    setSearchCompanyText: (state, action) => {
      state.searchCompanyText = action.payload;
    },
  },
});

export const { setCompanies, setSingleCompany, setSearchCompanyText } =
  companySlice.actions;
export default companySlice.reducer;

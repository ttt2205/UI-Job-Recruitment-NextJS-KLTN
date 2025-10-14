import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 1,
    size: 10,
    keyword: "",
    city: "",
    job: "",
};

export const employerAdminFilterSlice = createSlice({
    name: "employer-admin-filter-slice",
    initialState,
    reducers: {
        addPage: (state, {payload}) => {
            state.page = payload;
        },
        addSize: (state, {payload}) => {
            state.size = payload;
        },
        addKeyword: (state, {payload}) => {
            state.keyword = payload;
        },
        addCity: (state, {payload}) => {
            state.city = payload;
        },
        addJob: (state, {payload}) => {
            state.job = payload;
        },
        clearCityAndJob: (state) => {
            state.city = "";
            state.job = "";
        },
    }
});

export const {
    page,
    size,
    keyword,
    city,
    job,
    addPage,
    addSize,
    addKeyword,
    addCity,
    addJob,
    clearCityAndJob,
} = employerAdminFilterSlice.actions;

export default employerAdminFilterSlice.reducer;
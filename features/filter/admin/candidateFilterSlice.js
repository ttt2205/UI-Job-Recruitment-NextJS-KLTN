import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: "",     // từ khóa tìm kiếm
    gender: "",     // male | female | other
    sort: "",       // createdAt | name | hourlyRate | ...
    status: "",     // true | false | ""
    page: 1,
    size: 10,
};

export const candidateAdminFilterSlice = createSlice({
    name: "candidate-admin-filter-slice",
    initialState,
    reducers: {
        addSearch: (state, { payload }) => {
            state.search = payload;
        },
        addGender: (state, { payload }) => {
            state.gender = payload;
        },
        addSort: (state, { payload }) => {
            state.sort = payload;
        },
        addStatus: (state, { payload }) => {
            state.status = payload;
        },
        addPage: (state, { payload }) => {
            state.page = payload;
        },
        addSize: (state, { payload }) => {
            state.size = payload;
        },
        clearFilter: (state) => {
            state.search = "";
            state.gender = "";
            state.sort = "";
            state.status = "";
            state.page = 1;
            state.size = 10;
        },
    },
});

export const {
    addSearch,
    addGender,
    addSort,
    addStatus,
    addPage,
    addSize,
    clearFilter,
} = candidateAdminFilterSlice.actions;

export default candidateAdminFilterSlice.reducer;
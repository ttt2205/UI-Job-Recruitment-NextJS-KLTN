import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    keyword: "",
    location: "",
    category: "",
    candidateGender: "",
    sort: "",
    industryLevel: "",
    experienceLevel: "",
    educationLevel: "",
    status: "",
    page: 1,
    size: 10,
};

export const candidateAdminFilterSlice = createSlice({
    name: "candidate-admin-filter-slice",
    initialState,
    reducers: {
        addKeyword: (state, { payload }) => {
            state.keyword = payload;
        },
        addLocation: (state, { payload }) => {
            state.location = payload;
        },
        addCategory: (state, { payload }) => {
            state.category = payload;
        },
        addCandidateGender: (state, { payload }) => {
            state.candidateGender = payload;
        },
        clearExperienceF: (state) => {
            state.experiences = [];
        },
        clearQualificationF: (state) => {
            state.qualifications = [];
        },
        addSort: (state, { payload }) => {
            state.sort = payload;
        },
        addPage: (state, { payload }) => {
            state.page = payload;
        },
        addStatus: (state, {payload}) => {
            state.status = payload;
        },
        addSize: (state, { payload }) => {
            state.size = payload;
        },
        addIndustryLevel: (state, {payload}) => {
            state.industryLevel = payload;
        },
        addExperienceLevel: (state, { payload }) => {
            state.experienceLevel = payload;
        },
        addEducationLevel: (state, { payload }) => {
            state.educationLevel = payload;
        },
        clearFilter: (state) => {
            state.status = "";
            state.educationLevel = "",
            state.industryLevel ="";
            state.candidateGender = "";
            state.experienceLevel = "";
            state.location = "";
        },
    },
});

export const {
    addKeyword,
    addLocation,
    addCategory,
    addCandidateGender,
    addExperience,
    clearExperienceF,
    addSort,
    addPage,
    addSize,
    addExperienceLevel,
    addEducationLevel,
    addStatus,
    addIndustryLevel,
    clearFilter,
} = candidateAdminFilterSlice.actions;
export default candidateAdminFilterSlice.reducer;

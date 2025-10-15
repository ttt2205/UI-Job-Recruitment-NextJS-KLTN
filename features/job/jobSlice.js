import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    latestJob: ["full-time"],
    jobTypeList: [
        {
            id: 1,
            name: "Freelancer",
            value: "freelancer",
            isChecked: false,
        },
        {
            id: 2,
            name: "Full Time",
            value: "full-time",
            isChecked: false,
        },
        {
            id: 3,
            name: "Part Time",
            value: "part-time",
            isChecked: false,
        },
        {
            id: 4,
            name: "Temporary",
            value: "temporary",
            isChecked: false,
        },
    ],
    datePost: [
        { id: 1, name: "All", value: 0, isChecked: false },
        { id: 2, name: "Last 5 Days", value: 5, isChecked: false },
        { id: 2, name: "Last 15 Days", value: 15, isChecked: false },
        { id: 3, name: "Last 1 Month", value: 30, isChecked: false },
        { id: 4, name: "Last 2 Months", value: 60, isChecked: false },
        { id: 5, name: "Last 3 Months", value: 90, isChecked: false },
        { id: 6, name: "Last 4 Months", value: 120, isChecked: false },
        { id: 7, name: "Last 5 Months", value: 150, isChecked: false },
        { id: 8, name: "Last 6 Months", value: 180, isChecked: false },
        { id: 9, name: "Last 1 Year", value: 365, isChecked: false },
    ],

    experienceLavel: [
        { id: 1, name: "< 1 Year", value: "1", isChecked: false },
        { id: 2, name: "< 2 Year", value: "2", isChecked: false },
        { id: 3, name: "< 3 Year", value: "3", isChecked: false },
        { id: 4, name: "< 4 Year", value: "4", isChecked: false, },
        { id: 5, name: "< 5 Year", value: "5", isChecked: false, },
    ],
    tags: [
        {
            id: 1,
            name: "App",
            value: "app",
        },
        {
            id: 2,
            name: "Administrative",
            value: "administrative",
        },
        {
            id: 3,
            name: "Android",
            value: "android",
        },
        {
            id: 4,
            name: "Wordpress",
            value: "wordpress",
        },
        {
            id: 5,
            name: "Design",
            value: "design",
        },
        {
            id: 6,
            name: "React",
            value: "react",
        },
    ],
};

export const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        addLatestJob: (state, { payload }) => {
            const isExist = state.latestJob?.includes(payload);
            if (isExist) {
                state.latestJob = state.latestJob.filter(
                    (item) => item !== payload
                );
            } else {
                state.latestJob.push(payload);
            }
        },
        clearJobTypeToggle: (state) => {
            state?.jobTypeList?.map((item) => {
                item.isChecked = false;
                return {
                    ...item,
                };
            });
        },
        jobTypeCheck: (state, { payload }) => {
            state?.jobTypeList?.map((item) => {
                if (item.id === payload) {
                    if (item.isChecked) {
                        item.isChecked = false;
                    } else {
                        item.isChecked = true;
                    }
                }
                return {
                    ...item,
                };
            });
        },
        datePostCheck: (state, { payload }) => {
            state?.datePost?.map((item) => {
                item.isChecked = false;
                if (item.id === payload) {
                    item.isChecked = true;
                }
                return {
                    ...item,
                };
            });
        },
        clearDatePostToggle: (state) => {
            state?.datePost?.map((item) => {
                item.isChecked = false;
                return {
                    ...item,
                };
            });
        },
        experienceLavelCheck: (state, { payload }) => {
            state?.experienceLavel?.map((item) => {
                if (item.id === payload) {
                    if (item.isChecked) {
                        item.isChecked = false;
                    } else {
                        item.isChecked = true;
                    }
                }
                return {
                    ...item,
                };
            });
        },
        clearExperienceToggle: (state) => {
            state?.experienceLavel?.map((item) => {
                item.isChecked = false;
                return {
                    ...item,
                };
            });
        },
    },
});

export const {
    addLatestJob,
    clearJobTypeToggle,
    jobTypeCheck,
    datePostCheck,
    clearDatePostToggle,
    experienceLavelCheck,
    clearExperienceToggle,
} = jobSlice.actions;
export default jobSlice.reducer;

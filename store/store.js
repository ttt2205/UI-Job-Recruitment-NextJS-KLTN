import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "../features/job/jobSlice";
import toggleSlice from "../features/toggle/toggleSlice";
import filterSlice from "../features/filter/filterSlice";
import employerSlice from "../features/employer/employerSlice";
import employerFilterSlice from "../features/filter/employerFilterSlice";
import candidateSlice from "../features/candidate/candidateSlice";
import candidateFilterSlice from "../features/filter/candidateFilterSlice";
import shopSlice from "../features/shop/shopSlice";
import authSlice from "../features/auth/authSlice";
// <<<<<<< HEAD
import candidateAdminFilterSlice  from "../features/filter/admin/candidateFilterSlice";
import employerAdminFilterSlice  from "../features/filter/admin/employerFilterSlice";
// =======
import uploadCVSlice from "../features/upload/uploadCVSlice";
// >>>>>>> 1b1f106f4cfd669ddfb3334657ba8cf51e709a1a

export const store = configureStore({
    reducer: {
        job: jobSlice,
        toggle: toggleSlice,
        filter: filterSlice,
        employer: employerSlice,
        employerFilter: employerFilterSlice,
        candidate: candidateSlice,
        candidateFilter: candidateFilterSlice,
        shop: shopSlice,
        auth: authSlice,
// <<<<<<< HEAD
        candidateAdmin: candidateAdminFilterSlice,
        employerAdmin: employerAdminFilterSlice,
// =======
        upload: uploadCVSlice,
// >>>>>>> 1b1f106f4cfd669ddfb3334657ba8cf51e709a1a
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

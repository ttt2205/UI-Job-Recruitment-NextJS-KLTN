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
import candidateAdminFilterSlice from "../features/filter/admin/candidateFilterSlice";
import employerAdminFilterSlice from "../features/filter/admin/employerFilterSlice";
import uploadCVSlice from "../features/upload/uploadCVSlice";
import chatSlice from "../features/messages/chatSlice"
import userAdminFilterSlice from "../features/filter/admin/userFilterSlice";

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
                candidateAdmin: candidateAdminFilterSlice,
                employerAdmin: employerAdminFilterSlice,
                upload: uploadCVSlice,
                userAdmin: userAdminFilterSlice,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

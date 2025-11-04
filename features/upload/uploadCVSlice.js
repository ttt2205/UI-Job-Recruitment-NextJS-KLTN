import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadCVCandidate as uploadCVCandidateAPI } from "@/services/upload.service";
import { deleteCVCandidate as deleteCVCandidateAPI } from "@/services/upload.service";
import { getResumesByCandidateId as getResumesByCandidateIdAPI } from "@/services/resume-feature.service";

export const uploadCVCandidate = createAsyncThunk(
    "uploadCV/uploadCVCandidate",
    async ({ candidateId, file }, { rejectWithValue }) => {
        try {
            // API để upload CV
            const response = await uploadCVCandidateAPI(candidateId, file);
            const data = await response.data;
            if (!response.success && response.status !== 201) {
                throw new Error(data.message || "Upload CV thất bại");
            }
            return data; // Trả về dữ liệu của CV đã upload
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const deleteCVCandidate = createAsyncThunk(
    "uploadCV/deleteCVCandidate",
    async ({ file }, { rejectWithValue }) => {
        try {
            // Giả sử bạn có một hàm API để upload CV
            const response = await deleteCVCandidateAPI(file.id, file.fileName);
            if (!response.success) {
                throw new Error(data.message || "Upload failed");
            }
            return file; // Trả về cv đã xóa
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getResumesByCandidateId = createAsyncThunk(
    "uploadCV/getResumesByCandidateId",
    async (candidateId, { rejectWithValue }) => {
        try {
            const res = await getResumesByCandidateIdAPI(candidateId);
            console.log("Danh sách hồ sơ:", res.results);
            return res.results || [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const uploadCVSlice = createSlice({
    name: "uploadCV",
    initialState: {
        cvFiles: [],
        loading: false,
    },
    reducers: {
        removeCV: (state, action) => {
            state.cvFiles = state.cvFiles.filter(cv => cv.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getResumesByCandidateId.pending, (state) => {
                state.loading = true;
            })
            .addCase(getResumesByCandidateId.fulfilled, (state, action) => {
                if (state.cvFiles.length === 0) {
                    state.cvFiles = action.payload;
                }
                state.loading = false;
            })
            .addCase(getResumesByCandidateId.rejected, (state, action) => {
                console.error("Get resume by candidateId failed: ", action.payload);
                state.loading = false;
            })
            .addCase(uploadCVCandidate.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadCVCandidate.fulfilled, (state, action) => {
                state.cvFiles.unshift(action.payload);
                state.loading = false;
            })
            .addCase(uploadCVCandidate.rejected, (state, action) => {
                console.error("Upload CV failed: ", action.payload);
                state.loading = false;
            })
            .addCase(deleteCVCandidate.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCVCandidate.fulfilled, (state, action) => {
                state.cvFiles = state.cvFiles.filter((item) => item.id !== action.payload.id);
                state.loading = false;
            })
            .addCase(deleteCVCandidate.rejected, (state, action) => {
                console.error("Delete CV failed: ", action.payload);
                state.loading = false;
            });
    }
});

export const { } = uploadCVSlice.actions;
export default uploadCVSlice.reducer;
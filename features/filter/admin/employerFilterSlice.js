import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,          // Trang hiện tại (bắt buộc)
  size: 10,         // Số lượng bản ghi mỗi trang (bắt buộc)
  sort: "",         // Trường cần sắp xếp (tùy chọn)
  search: "",       // Từ khóa tìm kiếm (tùy chọn)
  status: "",       // Lọc theo trạng thái: "", true, false (tùy chọn)
};

export const employerAdminFilterSlice = createSlice({
  name: "employer-admin-filter",
  initialState,
  reducers: {
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    setSize: (state, { payload }) => {
      state.size = payload;
    },
    setSort: (state, { payload }) => {
      state.sort = payload;
    },
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
    clearFilters: (state) => {
      state.sort = "";
      state.search = "";
      state.status = "";
      state.page =1;
    },
  },
});

export const {
  setPage,
  setSize,
  setSort,
  setSearch,
  setStatus,
  clearFilters,
} = employerAdminFilterSlice.actions;

export default employerAdminFilterSlice.reducer;

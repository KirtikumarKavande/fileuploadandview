'use client'

import fileSlice from "./fileData";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    fileSlice: fileSlice.reducer,
  },
});
export default store;

'use client'
const { createSlice } = require("@reduxjs/toolkit");

const fileSlice= createSlice({
    name:"file",
    initialState:{uuid:""},
    reducers:{
        updateUuid(state,action){
               return {uuid:action.payload}
        }
    }
})
export const {updateUuid}=fileSlice.actions
export default fileSlice
'use client'
const { createSlice } = require("@reduxjs/toolkit");

const fileSlice= createSlice({
    name:"file",
    initialState:{uuid:"",createFileOrFolder:{}},
    reducers:{
        updateUuid(state,action){
               return {...state,uuid:action.payload}
        },
        addFolderOrFileReducer(state,action){
            return{...state,createFileOrFolder:action.payload}
        }

        
    }
})
export const {updateUuid}=fileSlice.actions
export const {addFolderOrFileReducer}=fileSlice.actions

export default fileSlice
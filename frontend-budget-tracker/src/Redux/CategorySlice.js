import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name : "category",
    initialState : { 
        categories : []
    },
    reducers : {
    initCategory : (state,action)=>{
        state.categories = action.payload;
    },

    addCategory : (state,action)=>{
        state.categories.push(action.payload);
    }
}
});

export default categorySlice.reducer;
export const {initCategory,addCategory} = categorySlice.actions;
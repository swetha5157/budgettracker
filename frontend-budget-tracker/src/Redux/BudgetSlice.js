import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
    name : "budget",
    initialState : { 
        budget : {
            allBudget : [],
            curBudget : {},
            isAll : true
        }
    },
    reducers : {
    initAllBudget : (state,action)=>{
        state.budget.allBudget = action.payload;
    },
    initCurBudget : (state,action)=>{
        state.budget.curBudget = action.payload;
    },
    addBudget : (state,action)=>{
        state.budget.allBudget.categories.push(action.payload);
    },
    updateAllBudget : (state,action)=>{
        state.budget.allBudget = state.budget.allBudget.map((data=>{
            if(data._id===action.payload._id) return action.payload;
            return data;
        }))
    }
}
});

export default budgetSlice.reducer;
export const {initAllBudget,initCurBudget,addBudget,updateAllBudget} = budgetSlice.actions;

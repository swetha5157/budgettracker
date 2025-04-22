import { createSlice } from "@reduxjs/toolkit";

const TransactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
  },
  reducers: {
    initTransaction: (state, action) => {
      state.transactions = action.payload;
    },
    addTransaction : (state,action)=>{
        state.transactions.push(action.payload);
    },
    updateTransac : (state,action)=>{
      state.transactions = state.transactions.map(data => {
        if(data._id===action.payload._id) return action.payload;
        return data;
      })
    }
  },
});

export const { initTransaction ,addTransaction,updateTransac} = TransactionSlice.actions;
export default TransactionSlice.reducer;

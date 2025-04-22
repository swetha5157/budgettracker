import { configureStore } from "@reduxjs/toolkit";
import TransactionSlice from './Transaction.js';
import categotySlice from "./CategorySlice.js";
import budgetSlice from './BudgetSlice.js'
import userSclice from './userSclice.js'

const store = configureStore({
  reducer: {
    transaction: TransactionSlice,
    category : categotySlice,
    budget : budgetSlice,
    user : userSclice
  },
});

export default store;

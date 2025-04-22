import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBudget, getMonthlyBudget } from '../Service/BudgetService';
import { useDispatch,useSelector } from 'react-redux';
import {initAllBudget,initCurBudget} from "../Redux/BudgetSlice.js";

const Budget = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allBudgets = useSelector(state => state.budget.budget.allBudget);
  const curBudget = useSelector(state => state.budget.budget.curBudget);
  const [error, setError] = useState(false); // Toggle this to simulate the error message
  const [budgetLeft, setBudgetLeft] = useState(0);
  const [budgetTotal, setBudgetTotal] = useState(0);  
  const [allBudget,setAllBudget] = useState(true);

  const fetchAllBudget = async()=>{
    try {
      const response = await getAllBudget("65f025cfc3c561182e843dc0");
      dispatch(initAllBudget(response.data));
      
    } catch (error) {
      setError(true);
    }
  };

  const fetchCurrentDateBudget = async()=>{
    try {
      const response = await getMonthlyBudget("65f025cfc3c561182e843dc0");
      dispatch(initCurBudget(response.data));
      setBudgetTotal(response.data.totalIncome);
      setBudgetLeft(response.data.totalIncome - response.data.totalExpense)
      
    } catch (error) {
      setError(true);
    }
  };


  useEffect(()=>{
    fetchAllBudget();
    fetchCurrentDateBudget();
  },[])

  return (
    <div className="p-6 bg-gray-50">
      <div className="border border-dashed border-gray-300 rounded-xl p-4 max-w-4xl mx-auto shadow-sm bg-white">
        <div className="grid grid-cols-3 gap-4 items-center mb-6">
          <div className="text-center">
            <button className="bg-blue-200 text-black font-semibold px-6 py-3 rounded-xl w-full">
              Budget Overview
            </button>
          </div>
          <div className="text-center" onClick={()=> navigate("/main/createBudget")}>
            <button className="border border-gray-300 px-6 py-3 rounded-xl w-full text-gray-600 hover:bg-gray-100">
              Create budget for this month
            </button>
          </div>
          <div className="text-center">
            <div className="border border-gray-200 rounded-xl p-3 text-gray-600">
              <p className="mb-2 font-medium">{`$${budgetLeft} left of $${budgetTotal}`}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center" onClick={()=> setAllBudget(!allBudget)}>
          <button className="border border-black px-4 py-2 rounded-md hover:bg-gray-100">
            {allBudget ?"Show Current Month Budget" : "Show All Budget"}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center mt-6 font-medium">Failed to fetch budgets</p>
        )}
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {(allBudget ? allBudgets : (curBudget==null || curBudget=={})?[]:[curBudget])?.map((budget, index) => (
          
            <div
              key={index}
              className="border rounded-lg p-4 shadow bg-white cursor-pointer hover:shadow-md transition"
              onClick={() => navigate(`/main/budgetDetails/${budget._id}`)}
            >
              <h3 className="font-semibold text-lg mb-1">
                Budget - {budget.month}/{budget.year}
              </h3>
              <p className="text-sm text-gray-600">{budget.categories.length} categories</p>
              <p className="mt-2 text-blue-500 underline text-sm">View Details</p>
            </div>
          ))}
</div>

    </div>
  );
};

export default Budget;
import React, { useEffect, useState } from "react";
import { getAllBudget } from "../Service/BudgetService";
import { initAllBudget } from "../Redux/BudgetSlice";
import { analysis } from "../Service/AIService";

const Dashboard = () => {

  const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [availableBudget,setAvailableBudget] = useState([]);

  const [analysisData, setAnalysisData] = useState(null);
  const [selected, setSelected] = useState({ month: null, year: null });

  const months = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];

  const simulateBackendResponse =async (month, year) => {
    // Simulated backend logic
    const response = await analysis(month,year);
    return response.data;
  };
    const fetchAllBudget = async()=>{
      try {
        const response = await getAllBudget();
        // dispatch(initAllBudget(response.data));
        console.log(response.data);
        
        setAvailableBudget(response.data);
      } catch (error) {
        alert(error.message);
      }
    };

  useEffect(()=>{
    fetchAllBudget();
  },[])

  const handleCardClick = async(month, year) => {
    setSelected({ month, year });
    const data = await simulateBackendResponse(month, year);
    setAnalysisData(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Budget Analysis
        </h1>

        {/* Budget Cards */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Available Budgets</h2>
          <div className="flex overflow-x-auto space-x-4 p-2 border rounded-md">
            {availableBudget.map((budget, index) => {
              const monthName = months.find((m) => m.value === budget.month)?.name;
              const isSelected =
                selected.month === budget.month && selected.year === budget.year;
              return (
                <button
                  key={index}
                  onClick={() => handleCardClick(budget.month, budget.year)}
                  className={`min-w-[150px] px-4 py-2 rounded-lg shadow-sm text-center transition-transform duration-150 ${
                    isSelected
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-100 text-indigo-700"
                  } hover:scale-105`}
                >
                  <p className="font-semibold">{shortMonths[budget.month-1]}</p>
                  <p>{budget.year}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Analysis Result */}
        {analysisData && (
          <div className="mt-8">
            <p className="text-lg text-gray-700 mb-6">{analysisData.message}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-indigo-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Income</h2>
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">Actual: </span>${analysisData.analysis.income}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">Budgeted: </span>${analysisData.analysis.budget_vs_actual.Income.budgeted}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">Difference: </span>${analysisData.analysis.budget_vs_actual.Income.difference}
                </p>
              </div>

              <div className="bg-red-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-red-700 mb-4">Expenses</h2>
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">Actual: </span>${analysisData.analysis.expenses}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">Budgeted: </span>${analysisData.analysis.budget_vs_actual.Expense.budgeted}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">Difference: </span>${analysisData.analysis.budget_vs_actual.Expense.difference}
                </p>
              </div>
            </div>

            <div className="bg-green-100 p-6 rounded-lg shadow-md mt-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">Net Surplus</h2>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Net: </span>${analysisData.analysis.net}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

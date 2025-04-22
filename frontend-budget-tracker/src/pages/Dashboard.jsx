import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import axios from 'axios';
import { getAllBudget } from '../Service/BudgetService';

const Dashboard = () => {
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getAllBudget("65f025cfc3c561182e843dc0");
        const formatted = res.data.map(item => ({
          name: `${item.month}/${item.year}`,
          income: item.totalIncome,
          expense: item.totalExpense,
          savings: item.savings,
          categories: item.categories || []
        }));

        setBudgetData(formatted);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAnalytics();
  }, []);

  const latest = budgetData[budgetData.length - 1];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

      {/* Summary Cards */}
      {latest && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-100 p-4 rounded-xl shadow">
            <h2 className="text-green-800 font-semibold">Income</h2>
            <p className="text-2xl font-bold">₹{latest.income}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-xl shadow">
            <h2 className="text-red-800 font-semibold">Expenses</h2>
            <p className="text-2xl font-bold">₹{latest.expense}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-xl shadow">
            <h2 className="text-blue-800 font-semibold">Savings</h2>
            <p className="text-2xl font-bold">₹{latest.savings}</p>
          </div>
        </div>
      )}

      {/* Bar Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Bar Chart - Monthly Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={budgetData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#4ade80" />
            <Bar dataKey="expense" fill="#f87171" />
            <Bar dataKey="savings" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Line Chart - Income vs Expense Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={budgetData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#4ade80" strokeWidth={2} />
            <Line type="monotone" dataKey="expense" stroke="#f87171" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;

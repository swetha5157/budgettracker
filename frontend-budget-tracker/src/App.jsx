import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Report from './pages/Report';
import DownloadReport from './pages/DownloadReport';
import Budget from './pages/Budget';
import CreateBudget from './components/CreateBudget';
import BudgetDetails from './components/BudgetDetails'; // fallback page
import { useSelector } from 'react-redux';

export default function App() {
  const { isAuthenticated } = useSelector(state=> state.user);
  console.log(isAuthenticated);
  

  return (
    <Routes>
      {/* Default redirect to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Login route with auth redirect */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/main/dashboard" /> : <Login />}
      />

      {/* Protected /main routes */}
      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reports" element={<Report />} />
        <Route path="transaction" element={<Transactions />} />
        <Route path="export" element={<DownloadReport />} />
        <Route path="budgets" element={<Budget />} />
        <Route path="createBudget" element={<CreateBudget />} />
        <Route path="budgetDetails/:id" element={<BudgetDetails />} />
      </Route>

      {/* Fallback 404 */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

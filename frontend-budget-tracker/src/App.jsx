import { Routes, Route,Navigate } from "react-router-dom";
import Login from './pages/Login.jsx'
import AppLayout from "./pages/AppLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import Budget from "./pages/Budget.jsx";
import CreateBudget from "./components/CreateBudget.jsx";
import BudgetDetails from "./components/BudgetDetails.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/main" element={<AppLayout/>}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transaction" element={<Transactions />} />
        <Route path="budgets" element={<Budget />} />
        <Route path="createBudget" element={<CreateBudget />} />
        <Route path="budgetDetails/:id" element={<BudgetDetails />} />
      </Route>
    </Routes>
  );
}

export default App;

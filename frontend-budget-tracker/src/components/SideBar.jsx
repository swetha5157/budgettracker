import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  BarChart,
  Download,
  UserCog,
} from "lucide-react";

const navLinks = [
  { name: "Dashboard", path: "/main/dashboard", icon: LayoutDashboard },
  { name: "Transactions", path: "/main/transaction", icon: CreditCard },
  { name: "Budgets", path: "/main/budgets", icon: Wallet },
  { name: "Reports", path: "/main/reports", icon: BarChart },
  { name: "Export Data", path: "/main/export", icon: Download },
  { name: "Update Profile", path: "/main/profile", icon: UserCog },
];

const Sidebar = ({ isCollapsed, isMobileOpen, toggleSidebar, closeMobile }) => {
  const { pathname } = useLocation();

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={closeMobile}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full bg-slate-900 text-white z-50 transition-all duration-300 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static
          ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-slate-700">
          <span className="text-2xl font-bold">
            {!isCollapsed && "Budget Tracker"}
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2 p-4">
            {navLinks.map(({ name, path, icon: Icon }) => (
              <li key={name}>
                <Link
                  to={path}
                  onClick={closeMobile}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 
                    hover:bg-slate-700 ${
                      pathname === path ? "bg-slate-800" : ""
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && <span>{name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

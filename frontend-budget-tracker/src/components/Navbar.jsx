import { Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {

    const user = {name : "kb"}

  const handleLogout = () => {
    console.log("User logged out");
    // dispatch(logout());
    setTimeout(() => navigate("/login"), 0);
  };

  return (
    <header className="w-full bg-white px-6 py-3 flex justify-between items-center shadow-sm">
      <button
        onClick={toggleSidebar}
        className="text-slate-700 hover:text-slate-900"
      >
        <Menu size={24} />
      </button>

      <div className="flex items-center gap-4 ml-auto">
        <div className="text-sm text-slate-600">Hi, {user?.name || "User"}</div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 transition"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;

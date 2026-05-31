import { Link, useLocation } from "react-router-dom";
import {
  FaChartLine,
  FaUserPlus,
  FaUsers,
  FaHeartbeat
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaChartLine />
    },
    {
      name: "Add Patient",
      path: "/add-patient",
      icon: <FaUserPlus />
    },
    {
      name: "Patient List",
      path: "/patients",
      icon: <FaUsers />
    }
  ];

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white shadow-2xl">

      <div className="p-6 border-b border-slate-700">

        <div className="flex items-center gap-3">

          <div className="bg-cyan-500 p-3 rounded-xl">
            <FaHeartbeat size={24} />
          </div>

          <div>
            <h2 className="font-bold text-lg">
              AI Health
            </h2>

            <p className="text-slate-400 text-sm">
              Analytics
            </p>
          </div>

        </div>

      </div>

      <div className="mt-8">

        {menu.map((item) => (

          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 mx-3 px-4 py-3 rounded-xl mb-3 transition-all duration-300
              ${
                location.pathname === item.path
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "hover:bg-slate-800 text-slate-300"
              }
            `}
          >

            {item.icon}

            {item.name}

          </Link>

        ))}

      </div>

    </div>
  );
}

export default Sidebar;
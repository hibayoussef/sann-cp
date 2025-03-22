import { NavLink } from "react-router-dom";

const settingsLinks = [
  { name: "Profile", path: "/settings/profile" },
  { name: "Branding", path: "/settings/branding" },
  { name: "Branches", path: "/settings/branches" },
  { name: "Currencies", path: "/settings/currencies" },
];

const SettingsSidebar = () => {
  return (
    <aside className="w-64 bg-white h-screen shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Settings</h3>
      <ul>
        {settingsLinks.map((link) => (
          <li key={link.path} className="mb-2">
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SettingsSidebar;

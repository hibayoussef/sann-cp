import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useFetchMe } from "../../hooks/useMe";
import { _AuthApi } from "../../services/auth.service";
import { useLocaliztionStore } from "@/store/useLocaliztionStore";

const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { data: userData } = useFetchMe();

  const { direction } = useLocaliztionStore();

  return (
    <div>
      {/* Profile Image Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center ml-auto"
      >
        👤
      </button>

      {/* Sidebar Dropdown */}
      {isDropdownOpen && (
        <div className="relative">
          <div
            className={`absolute top-[-5px] transform rotate-45 w-3 h-4 bg-white border-l border-t border-gray-200 z-50 ${
              direction === "rtl" ? "left-3" : "right-3"
            }`}
          />

          <div
            className={`fixed top-12 h-full w-96 bg-white shadow-xl border-l border-gray-200 z-50 flex flex-col ${
              direction === "rtl" ? "left-0" : "right-0 "
            }`}
          >
            <div className="mt-4 p-4 space-y-4">
              <div className="space-y-1 border-b border-gray-200 pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-gray-800 text-lg">
                      {userData?.user.name}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {userData?.user?.email}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {userData?.user?.email}
                  </div>
                </div>

                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-1 -mt-1"
                >
                  <IoClose className="w-6 h-6" />
                </button>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-700">User ID:</span>
                  <span className="text-gray-600">{userData?.user?.id}</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-700">
                    Organization ID:
                  </span>
                  <span className="text-gray-600">
                    {userData?.organization?.id}
                  </span>
                </div>
              </div>
            </div>

            <div className="pb-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate("/profile")}
                  className="text-[#575db1] hover:bg-gray-50 p-2 rounded cursor-pointer text-sm transition-colors"
                >
                  My Account
                </button>

                <button
                  onClick={async () => {
                    try {
                      await _AuthApi.logout();
                      navigate("/signin");
                    } catch (error) {
                      console.error("Logout failed:", error);
                    }
                  }}
                  className="text-red-600 hover:bg-gray-50 p-2 rounded cursor-pointer text-sm transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Trial Section */}
            <div className="pb-4 border-b border-gray-200">
              <div className="text-sm font-medium text-red-600">
                Your free trial is over
              </div>
            </div>

            {/* Links Section */}
            <div className="p-4 space-y-4">
              <a
                href="#"
                className="block text-blue-600 hover:underline text-sm"
              >
                What’s New? →
              </a>
              <a
                href="#"
                className="block text-blue-600 hover:underline text-sm"
              >
                Essential guides for your business →
              </a>
              <a
                href="#"
                className="block text-blue-600 hover:underline text-sm"
              >
                Navigate faster with keyboard shortcuts →
              </a>
              <a
                href="#"
                className="block text-blue-600 hover:underline text-sm"
              >
                Download the mobile app →
              </a>
              <a
                href="#"
                className="block text-blue-600 hover:underline text-sm"
              >
                Work simpler with Windows app →
              </a>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Web: https://www.schmit.edu/ (cdn/School)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

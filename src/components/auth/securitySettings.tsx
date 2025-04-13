import { ShieldCheckIcon } from "lucide-react";
import { useDisable2FA, useEnable2FA } from "@/hooks/useEnable2FA";
import { useState } from "react";
import MfaConfirmModal from "./MfaConfirmModal";
import { useFetchMe } from "@/hooks/useMe";
import Loader from "../ui/loader/loader";

export default function SecuritySettings() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: me, isLoading } = useFetchMe();

  const { mutateAsync: enableMutation, isPending: enabling } = useEnable2FA();
  const { mutateAsync: disableMutation, isPending: disabling } =
    useDisable2FA();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async (email: string, password: string) => {
    if (me?.mfa)
      disableMutation({ email, password }).then(() => {
        setIsModalOpen(false);
      });
    else
      enableMutation({ email, password }).then(() => {
        setIsModalOpen(false);
      });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-850">
      <div className="flex items-start gap-4">
        <ShieldCheckIcon className="w-8 h-8 text-brand-500 mt-1" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Two-Factor Authentication (2FA)
          </h3>

          <div className="mt-4 space-y-4">
            <div className="p-4 border rounded-lg dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">
                    Authenticator App
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Use time-based OTPs
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <button
                  onClick={handleOpenModal}
                  className={`px-4 py-2 rounded-md font-medium text-white transition-colors ${
                    me?.mfa
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {me?.mfa ? "Disable" : "Enable"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <MfaConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleConfirm}
        loading={enabling || disabling}
        email={me?.user.email}
      />
    </div>
  );
}

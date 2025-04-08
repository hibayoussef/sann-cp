import { Dialog } from "@headlessui/react";

export default function Enable2FAModal() {
  return (
    <Dialog.Panel className="w-full max-w-2xl rounded-xl bg-white dark:bg-gray-850 p-8">
      <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white">
        Secure Your ERP Account
      </Dialog.Title>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* QR Code Section */}
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <img src="https://miro.medium.com/v2/resize:fit:789/1*A9YcoX1YxBUsTg7p-P6GBQ.png" alt="QR Code" className="w-48 h-48 mx-auto" />
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-gray-800 dark:text-gray-200">
              Setup Instructions:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                Install an authenticator app (Google/Microsoft Authenticator)
              </li>
              <li>
                Open the app and tap <strong>Add Account</strong>
              </li>
              <li>
                Choose <strong>Scan QR Code</strong>
              </li>
              <li>Point your camera at this QR code</li>
            </ol>
          </div>
        </div>

        {/* Manual Setup Section */}
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                Manual Entry
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Secret Key:
                </span>
                <span className="font-mono text-brand-500">
                  JBSWY3DPEHPK3PXP
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Verification Code
              </label>
              <div className="flex gap-3">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center text-xl border rounded-lg focus:ring-2 focus:ring-brand-500"
                  />
                ))}
              </div>
            </div>

            <button className="w-full py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600">
              Verify & Activate
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Having trouble? Contact your system administrator
        </p>
      </div>
    </Dialog.Panel>
  );
}

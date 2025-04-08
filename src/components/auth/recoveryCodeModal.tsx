import { Dialog } from '@headlessui/react';

const mockCodes = [
  '3k9v-7xq2-8m5r',
  'z4h6-p9l8-t2n7',
  'b5m3-c1k8-q6j4',
  'r8t2-y7u1-i9o0',
  'w3e4-s5d6-f7g8',
];

export default function RecoveryCodesModal({ isOpen, onClose }: any) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-xl rounded-xl bg-white dark:bg-gray-800 p-6">
          <Dialog.Title className="text-lg font-medium mb-4">
            Recovery Codes
          </Dialog.Title>

          <div className="space-y-6">
            <div className="p-4 bg-red-50 rounded-lg dark:bg-red-900/20">
              <p className="text-sm text-red-600 dark:text-red-400">
                Store these codes in a secure place. Each code can be used only once.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {mockCodes.map((code, index) => (
                <div
                  key={index}
                  className="p-3 font-mono text-center bg-gray-100 rounded-lg dark:bg-gray-700"
                >
                  {code}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-700"
              >
                Close
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-white transition bg-brand-500 rounded-lg hover:bg-brand-600"
              >
                Download Codes
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
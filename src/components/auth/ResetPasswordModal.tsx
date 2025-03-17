interface ResetPasswordModalProps {
  onClose: () => void;
}

export default function ResetPasswordModal({
  onClose,
}: ResetPasswordModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold text-gray-800">Email Sent</h2>
        <p className="mt-2 text-gray-600">
          A password reset link has been sent to your email. Please check your
          inbox and follow the instructions.
        </p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-[#575db1] hover:bg-[#474ca1] text-white py-2 rounded-md"
        >
          OK
        </button>
      </div>
    </div>
  );
}

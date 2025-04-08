import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../ui/loader/loader';

export default function TwoFactorForm() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (index:any, value:any) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (code.join('') === '123456') {
        navigate('/dashboard');
      } else {
        setError('Invalid verification code');
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90">
            Two-Factor Authentication
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-12 h-12 text-2xl text-center border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700"
                autoFocus={index === 0}
              />
            ))}
          </div>

          {error && (
            <p className="text-sm text-center text-red-600 dark:text-red-500">
              {error}
            </p>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading || code.some(d => d === '')}
              className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-[#465FFF] hover:bg-[#384dd4]"
            >
              {isLoading ? <Loader /> : 'Verify Code'}
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/recovery-codes"
              className="text-sm font-medium text-brand-500 hover:underline dark:text-brand-400"
            >
              Use recovery code
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
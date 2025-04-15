import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Loader from '../ui/loader/loader';
import { useSendOtpLogin, useOtpLogin } from '../../hooks/useLogin';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { otpValidationSchema } from './registerStepps/validations/siginValidation';
import { ClockIcon } from 'lucide-react';

interface OTPFormValues {
  email: string;
  otp?: string | undefined; 
}

export default function OTPLoginForm() {
  const [emailSent, setEmailSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const { 
    mutate: sendOtp, 
    isPending: isSending, 
    isError: isSendError 
  } = useSendOtpLogin();

  const { mutate: verifyOtp, isPending: isVerifying } = useOtpLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    resetField
  } = useForm<OTPFormValues>({
    resolver: yupResolver(otpValidationSchema),
    mode: 'onChange',
     context: { emailSent }
  });

  const email = watch('email');

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleSendOtp = async () => {
    clearErrors('email');
    try {
      await sendOtp(email, {
        onSuccess: () => {
          setEmailSent(true);
          setCountdown(60);
        },
        onError: (error:any) => {
          setEmailSent(false);
          setError('email', {
            type: 'manual',
            message: error?.response?.data?.message || 'Invalid email address',
          });
          resetField('otp');
        }
      });
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
  };

  const handleResendOtp = async () => {
    await handleSendOtp();
  };

  const onSubmit = handleSubmit(async (data) => {
    if (emailSent) {
      await verifyOtp({ email: data.email, otp: data.otp });
    }
  });

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8 text-center">
            <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-sm md:text-md">
              Sign in with OTP
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {emailSent && !isSendError
                ? 'Enter the OTP sent to your email'
                : 'Enter your email to receive an OTP'}
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label>
                Email Address <span className="text-error-500">*</span>
              </Label>
              <Input
                type="email"
                {...register('email')}
                placeholder='please enter your email'
                disabled={emailSent && !isSendError}
                error={!!errors.email}
                hint={errors.email?.message}
              />
            </div>

            {/* Show OTP field only when API request succeeded */}
            {emailSent && !isSendError && (
              <>
                <div>
                  <Label>
                    OTP Code <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    {...register('otp')}
                    error={!!errors.otp}
                    hint={errors.otp?.message}
                    placeholder="Enter 6-digit code"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <p className='text-sm text-red-500 hover:text-red-600 dark:text-red-400'>OTP will be valid for 15 minutes</p>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={countdown > 0}
                    className="flex items-center gap-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                       
                    {countdown > 0 && (
                      <>
                        <ClockIcon className="w-4 h-4" />
                        <span>{countdown}s</span>
                      </>
                    )}
                    {countdown <= 0 && 'Resend OTP'}
                 
                  </button>
                </div>
              </>
            )}

            <div className="space-y-4">
              {!emailSent || isSendError ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isSending || !!errors.email}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-[#465FFF] hover:bg-[#465FFF]"
                >
                  {isSending ? <Loader /> : 'Send OTP'}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-[#465FFF] hover:bg-[#465FFF]"
                >
                  {isVerifying ? <Loader /> : 'Verify OTP'}
                </button>
              )}

              <div className="mt-3 text-center">
                <Link
                  to="/signin"
                  className="text-sm font-medium text-brand-500 hover:underline dark:text-brand-400"
                >
                  Back to password login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
import { useGet2FAQRCode, useGetRecoveryCodes } from "@/hooks/useEnable2FA";
import AuthLayout from "./AuthPageLayout";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  code: z.string().nonempty("Verification code is required"),
});

const MfaVerification = () => {
  const {} = useGet2FAQRCode({ email: "", password: "" });
  const {} = useGetRecoveryCodes({ email: "", password: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {};

  return (
    <AuthLayout>
      <div className="flex flex-col flex-1">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div className="mb-5 sm:mb-8 text-center">
            <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-sm md:text-md">
              MFA Verification
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your code to sign in!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label htmlFor="code">Code</Label>
                <Input
                  id="code"
                  placeholder="Code"
                  {...register("code")}
                  className="w-full p-2 border rounded dark:bg-gray-700"
                  error={!!errors.code}
                  hint={errors.code?.message}
                />
              </div>
              <div className="flex justify-end mt-6">
                <button className="bg-brand-500 text-white px-4 py-2 rounded hover:bg-brand-600">
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default MfaVerification;

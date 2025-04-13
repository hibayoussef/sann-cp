import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email().nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

export default function MfaConfirmModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
  email,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, password: string) => void;
  email: string | undefined;
  loading?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email,
      password: "",
    },
  });

  const onFormSubmit = (values: z.infer<typeof schema>) => {
    onSubmit(values.email, values.password);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded bg-white dark:bg-gray-800 p-6 shadow">
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
            Confirm Your Identity
          </h2>

          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded dark:bg-gray-700"
                  {...register("email")}
                  error={!!errors.email}
                  hint={errors.email?.message}
                  disabled
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>

                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border rounded dark:bg-gray-700"
                  {...register("password")}
                  error={!!errors.password}
                  hint={errors.password?.message}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={onClose}
                className="text-sm text-gray-600 dark:text-gray-300"
                type="button"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                className="bg-brand-500 text-white px-4 py-2 rounded hover:bg-brand-600"
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

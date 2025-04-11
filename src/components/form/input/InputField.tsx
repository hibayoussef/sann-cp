import type { FC } from "react";
import React from "react";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string | number;
  max?: string | number;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
  readOnly?: boolean;
  icon?: React.ReactNode;
}

const Input: FC<InputProps & React.RefAttributes<HTMLInputElement>> =
  React.forwardRef(
    (
      {
        type = "text",
        id,
        name,
        placeholder,
        value,
        onChange,
        onBlur,
        className = "",
        min,
        max,
        step,
        disabled = false,
        success = false,
        error = false,
        hint,
        readOnly = false,
        icon,
      },
      ref
    ) => {
      let inputClasses = `h-8 w-full rounded-lg border appearance-none px-4 py-2.5 text-[13px] shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

      if (readOnly) {
        inputClasses +=
          " text-gray-500 border-gray-300 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400";
      } else if (disabled) {
        inputClasses +=
          " text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
      } else if (error) {
        inputClasses +=
          " border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800";
      } else if (success) {
        inputClasses +=
          " border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800";
      } else {
        inputClasses +=
          " bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800";
      }

      return (
        <div className="relative">
          {icon && (
            <div
              style={{ paddingBottom: hint ? "18px" : "" }}
              className="absolute inset-y-0 left-3 flex items-center text-gray-400"
            >
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className={`${inputClasses} ${icon ? "pl-10" : ""}`}
            readOnly={readOnly}
          />

          {hint && (
            <p
              className={`mt-1.5 text-xs ${
                error
                  ? "text-error-500"
                  : success
                  ? "text-success-500"
                  : "text-gray-500"
              }`}
            >
              {hint}
            </p>
          )}
        </div>
      );
    }
  );

export default Input;

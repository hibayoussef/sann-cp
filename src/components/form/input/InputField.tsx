import "flatpickr/dist/themes/light.css";
import type { FC } from "react";
import React from "react";
import Flatpickr from "react-flatpickr";
import { ChangeHandler } from "react-hook-form";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number | Date | Date[];
  onChange?: ChangeHandler | ((value: string | Date[]) => void);
  onBlur?: ChangeHandler;
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
  options?: any;
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
        options,
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
      const handleDateChange = (dates: Date[]) => {
        if (dates[0]) {
          const selectedDate = dates[0];

          const dateStr = selectedDate
            .toLocaleDateString("en-CA")
            .split("/")[0];

          if (typeof onChange === "function") {
            try {
              const event = {
                target: {
                  name: name || "",
                  value: dateStr,
                },
              };
              (onChange as (event: any) => void)(event);
            } catch {
              (onChange as (value: string) => void)(dateStr);
            }
          }
        }
      };

      const getDateValue = () => {
        if (!value) return undefined;

        if (typeof value === "string") {
          if (!value || value === "null" || value === "undefined")
            return undefined;

          if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return value;
          }

          const date = new Date(value);
          return isNaN(date.getTime())
            ? undefined
            : date.toISOString().split("T")[0];
        }

        if (value instanceof Date) return value.toISOString().split("T")[0];

        if (Array.isArray(value)) return value[0]?.toISOString().split("T")[0];

        return undefined;
      };

      return (
        <div className="relative">
          {icon && type !== "date" && (
            <div
              style={{ paddingBottom: hint ? "18px" : "" }}
              className="absolute inset-y-0 left-3 flex items-center text-gray-400"
            >
              {icon}
            </div>
          )}

          {type === "date" ? (
            <div className="relative w-full flatpickr-wrapper">
              {icon && (
                <span className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none dark:text-gray-400 z-10">
                  {icon}
                </span>
              )}
              <Flatpickr
                value={getDateValue()}
                onChange={handleDateChange}
                options={{
                  dateFormat: "Y-m-d",
                  ...options,
                }}
                placeholder={placeholder || "Select date"}
                className={`${inputClasses} ${icon ? "ps-10" : ""}`}
                disabled={disabled || readOnly}
              />
            </div>
          ) : (
            <input
              ref={ref}
              type={type}
              id={id}
              name={name}
              placeholder={placeholder}
              value={value as string | number | readonly string[] | undefined}
              onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
              onBlur={onBlur}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              className={`${inputClasses} ${icon ? "pl-10" : ""}`}
              readOnly={readOnly}
            />
          )}

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

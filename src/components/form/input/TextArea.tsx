import React from "react";

// interface TextareaProps {
//   placeholder?: string;
//   rows?: number;
//   value?: string;
//   onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
//   onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
//   className?: string;
//   disabled?: boolean;
//   error?: boolean;
//   hint?: string;
// }

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  hint?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      placeholder = "Enter your message",
      rows = 3,
      className = "",
      error = false,
      hint = "",
      ...props
    },
    ref
  ) => {
    const textareaClasses = `
      w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-none
      ${
        props.disabled
          ? "bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
          : error
          ? "border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800"
          : "bg-transparent text-gray-900 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
      }
      ${className}
    `;

    return (
      <div className="relative">
        <textarea
          ref={ref}
          placeholder={placeholder}
          rows={rows}
          className={textareaClasses}
          {...props}
        />
        {hint && (
          <p
            className={`mt-1.5 text-xs ${
              error ? "text-error-500" : "text-gray-500"
            }`}
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;

// import React from "react";

// interface TextareaProps {
//   placeholder?: string;
//   rows?: number;
//   value?: string;
//   onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
//   onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
//   className?: string;
//   disabled?: boolean;
//   error?: boolean;
//   hint?: string;
// }

// const TextArea = React.forwardRef<
//   HTMLTextAreaElement,
//   TextareaProps & React.RefAttributes<HTMLTextAreaElement>
// >(
//   (
//     {
//       placeholder = "Enter your message",
//       rows = 3,
//       value,
//       onChange,
//       onBlur,
//       className = "",
//       disabled = false,
//       error = false,
//       hint = "",
//     },
//     ref
//   ) => {
//     const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//       if (onChange) {
//         onChange(e);
//       }
//     };

//     let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-none ${className}`;

//     if (disabled) {
//       textareaClasses += ` bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
//     } else if (error) {
//       textareaClasses += ` border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
//     } else {
//       textareaClasses += ` bg-transparent text-gray-900 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
//     }

//     return (
//       <div className="relative">
//         <textarea
//           ref={ref}
//           placeholder={placeholder}
//           rows={rows}
//           value={value}
//           onChange={handleChange}
//           onBlur={onBlur}
//           disabled={disabled}
//           className={textareaClasses}
//         />
//         {hint && (
//           <p
//             className={`mt-1.5 text-xs ${
//               error ? "text-error-500" : "text-gray-500"
//             }`}
//           >
//             {hint}
//           </p>
//         )}
//       </div>
//     );
//   }
// );

// export default TextArea;

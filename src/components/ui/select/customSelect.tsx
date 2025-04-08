import { Check, ChevronDown, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

interface DynamicSelectProps<T = string> {
  name: string;
  options: Array<{ value: T; label: string }>;
  placeholder?: string;
  searchPlaceholder?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  onChange?: (value: T) => void;
  isRequired?: boolean;
  icon?: React.ReactNode;
  value?: T;
}

export const CustomSelect = <T = string,>({
  name,
  options,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  error,
  className = "",
  disabled = false,
  onChange,
  // isRequired = false,
  icon,
  value,
}: DynamicSelectProps<T>) => {
  const formContext = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<{
    value: T;
    label: string;
  } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formValue = formContext ? formContext.watch(name) : value;

  useEffect(() => {
    if (formValue && options.length > 0) {
      const option = options.find(opt => String(opt.value) === String(formValue));
      if (option) {
        setSelectedOption(option);
      }
    } else {
      setSelectedOption(null);
    }
  }, [formValue, options]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = async (option: { value: T; label: string }) => {
    setSelectedOption(option);
    if (formContext) {
      formContext.setValue(name, option.value, { shouldValidate: true });
      await formContext.trigger(name);
      formContext.clearErrors(name);
    }
    onChange?.(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = async () => {
    setSelectedOption(null);
    if (formContext) {
      formContext.setValue(name, "", { shouldValidate: true });
      await formContext.trigger(name);
      formContext.clearErrors(name);
    }
    onChange?.("" as T);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`w-full text-left pl-3 pr-2 py-1 border rounded-[8px] flex items-center justify-between transition-all duration-200 ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-gray-200 hover:border-gray-300 focus:border-blue-400"
        } ${
          disabled
            ? "bg-gray-50 cursor-not-allowed  text-gray-400"
            : "bg-white text-gray-700"
        } shadow-sm text-sm`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2 text-gray-400">{icon}</span>}
          <span className={`truncate ${!selectedOption ? "text-gray-400" : ""}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {selectedOption && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="p-2 border-b border-gray-100 bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={String(option.value)}
                  type="button"
                  className={`w-full text-left px-3 py-1 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${
                    selectedOption?.value === option.value
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700"
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  <span>{option.label}</span>
                  {selectedOption?.value === option.value && (
                    <Check className="w-4 h-4 text-blue-500" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-3 py-3 text-sm text-gray-500 text-center">
                No options found
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center">
          <span className="mr-1">•</span>
          {error}
        </p>
      )}
    </div>
  );
};
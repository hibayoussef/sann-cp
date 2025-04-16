import { Check, ChevronDown, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

interface OptionType<T = string> {
  value: T;
  label: string;
  prefix_code?: string;
  isParent?: boolean;
  children?: OptionType<T>[];
}

interface DynamicSelectProps<T = string> {
  name: string;
  options: OptionType<T>[];
  placeholder?: string;
  searchPlaceholder?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  onChange?: (value: T[]) => void;
  isRequired?: boolean;
  icon?: React.ReactNode;
  value?: T[];
}

export const CustomSelectMulti = <T = string,>({
  name,
  options,
  placeholder = "Select options",
  searchPlaceholder = "Search...",
  error,
  className = "",
  disabled = false,
  onChange,
  icon,
  value,
}: DynamicSelectProps<T>) => {
  const formContext = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<OptionType<T>[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formValue = formContext ? formContext.watch(name) : value;

  useEffect(() => {
    if (formValue && options.length > 0) {
      const findOptions = (opts: OptionType<T>[], values: T[]): OptionType<T>[] => {
        const found: OptionType<T>[] = [];
        
        opts.forEach(option => {
          if (option.isParent && option.children) {
            found.push(...findOptions(option.children, values));
          } else if (values.includes(option.value)) {
            found.push(option);
          }
        });
        
        return found;
      };

      const selected = findOptions(options, formValue);
      setSelectedOptions(selected);
    } else {
      setSelectedOptions([]);
    }
  }, [formValue, options]);

  const filteredOptions = options.filter((option) => {
    if (option.isParent) {
      return (
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.children?.some((child) =>
          child.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    return option.label.toLowerCase().includes(searchTerm.toLowerCase());
  });

//   const handleSelect = async (option: OptionType<T>) => {
//     if (option.isParent) return;

//     const isSelected = selectedOptions.some(opt => String(opt.value) === String(option.value));
//     let newSelectedOptions;

//     if (isSelected) {
//       newSelectedOptions = selectedOptions.filter(opt => String(opt.value) !== String(option.value));
//     } else {
//       newSelectedOptions = [...selectedOptions, option];
//     }

//     setSelectedOptions(newSelectedOptions);
    
//     if (formContext) {
//       const values = newSelectedOptions.map(opt => opt.value);
//       formContext.setValue(name, values, { shouldValidate: true });
//       await formContext.trigger(name);
//     }
//     onChange?.(newSelectedOptions.map(opt => opt.value));
//     setSearchTerm("");
  
//   };
const handleSelect = async (option: OptionType<T>) => {
  if (option.isParent) return;

  const isSelected = selectedOptions.some(opt => String(opt.value) === String(option.value));
  let newSelectedOptions;

  if (isSelected) {
    newSelectedOptions = selectedOptions.filter(opt => String(opt.value) !== String(option.value));
  } else {
    newSelectedOptions = [...selectedOptions, option];
  }

  setSelectedOptions(newSelectedOptions);
  console.log('Selected values:', newSelectedOptions.map(opt => opt.value));
  if (formContext) {
    // إرجاع مصفوفة من القيم فقط (IDs)
    const values = newSelectedOptions.map(opt => opt.value);
    formContext.setValue(name, values, { shouldValidate: true });
    await formContext.trigger(name);
  }
  onChange?.(newSelectedOptions.map(opt => opt.value));
    setSearchTerm("");
    
};
  const handleClear = async () => {
    setSelectedOptions([]);
    if (formContext) {
      formContext.setValue(name, [], { shouldValidate: true });
      await formContext.trigger(name);
    }
    onChange?.([]);
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

  const renderSelectedOptions = () => {
    if (selectedOptions.length === 0) {
      return <span className="text-gray-400">{placeholder}</span>;
    }
    
    return (
      <div className="flex flex-wrap gap-1">
        {selectedOptions.map(option => (
          <span 
            key={String(option.value)} 
            className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs flex items-center"
          >
            {option.label}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(option);
              }}
              className="ml-1 text-blue-400 hover:text-blue-600"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    );
  };

  const renderOptions = (opts: OptionType<T>[]) => {
    return opts.map((option) => (
      <div key={String(option.value)}>
        {option.isParent ? (
          <div className="px-3 py-2 text-sm font-medium text-gray-500 bg-gray-50">
            {option.label}
          </div>
        ) : (
          <button
            type="button"
            className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${
              selectedOptions.some(opt => String(opt.value) === String(option.value))
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700"
            }`}
            onClick={() => handleSelect(option)}
          >
            <div className="flex flex-col">
              <span>{option.label}</span>
              {option.prefix_code && (
                <span className="text-xs text-gray-500">
                  Code: {option.prefix_code}
                </span>
              )}
            </div>
            {selectedOptions.some(opt => String(opt.value) === String(option.value)) && (
              <Check className="w-4 h-4 text-blue-500" />
            )}
          </button>
        )}
        {option.children && (
          <div className="pl-4">{renderOptions(option.children)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`w-full text-left pl-3 pr-2 py-2 border rounded-[8px] flex items-center justify-between transition-all duration-200 ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-gray-200 hover:border-gray-300 focus:border-blue-400"
        } ${
          disabled
            ? "bg-gray-50 cursor-not-allowed text-gray-400"
            : "bg-white text-gray-700"
        } shadow-sm text-sm`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <div className="flex items-center flex-1 min-w-0">
          {icon && <span className="mr-2 text-gray-400">{icon}</span>}
          <div className="truncate">
            {renderSelectedOptions()}
          </div>
        </div>
        <div className="flex items-center space-x-1 ml-2">
          {selectedOptions.length > 0 && (
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
              renderOptions(filteredOptions)
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
          {error}
        </p>
      )}
    </div>
  );
};
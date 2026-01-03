interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    label?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    placeholder?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

const Select: React.FC<SelectProps> = ({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = 'Select an option',
    error,
    required = false,
    disabled = false,
    className = ''
}) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-[#980404]">*</span>}
                </label>
            )}
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`w-full px-4 py-2 bg-[#F3F4F4] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#980404] focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${error ? 'border-red-500' : ''} ${className}`}
            >
                <option value="">{placeholder}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Select;
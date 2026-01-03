interface TextareaProps {
    label?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    rows = 4,
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
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                required={required}
                disabled={disabled}
                className={`w-full px-4 py-2 bg-[#F3F4F4] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#980404] focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed ${error ? 'border-red-500' : ''} ${className}`}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Textarea;
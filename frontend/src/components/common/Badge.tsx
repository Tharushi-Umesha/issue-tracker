interface BadgeProps {
    children: React.ReactNode;
    variant?: string;
    size?: 'small' | 'medium' | 'large';
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    size = 'medium'
}) => {
    const baseStyles = 'inline-flex items-center font-medium rounded-full';

    const variants: Record<string, string> = {
        open: 'bg-blue-100 text-blue-800',
        'in-progress': 'bg-yellow-100 text-yellow-800',
        resolved: 'bg-green-100 text-green-800',
        closed: 'bg-gray-100 text-gray-800',
        low: 'bg-gray-100 text-gray-700',
        medium: 'bg-blue-100 text-blue-700',
        high: 'bg-orange-100 text-orange-700',
        critical: 'bg-red-100 text-red-700',
        minor: 'bg-green-100 text-green-700',
        major: 'bg-yellow-100 text-yellow-700',
        default: 'bg-[#E6E6E6] text-gray-800'
    };

    const sizes = {
        small: 'px-2 py-0.5 text-xs',
        medium: 'px-3 py-1 text-sm',
        large: 'px-4 py-1.5 text-base'
    };

    const variantKey = variant.toLowerCase().replace(/\s+/g, '-');

    return (
        <span className={`${baseStyles} ${variants[variantKey] || variants.default} ${sizes[size]}`}>
            {children}
        </span>
    );
};

export default Badge;
interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'small' | 'normal' | 'large';
    hover?: boolean;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    padding = 'normal',
    hover = false,
    onClick
}) => {
    const paddings = {
        none: 'p-0',
        small: 'p-3',
        normal: 'p-6',
        large: 'p-8'
    };

    const hoverEffect = hover ? 'hover:shadow-lg transition-shadow duration-200' : '';

    return (
        <div
            className={`bg-white rounded-lg shadow-md ${paddings[padding]} ${hoverEffect} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
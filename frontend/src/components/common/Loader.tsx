interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
    fullScreen?: boolean;
    text?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', fullScreen = false, text = '' }) => {
    const sizes = {
        small: 'w-4 h-4 border-2',
        medium: 'w-8 h-8 border-3',
        large: 'w-12 h-12 border-4'
    };

    const spinner = (
        <div className="flex flex-col items-center justify-center gap-3">
            <div className={`${sizes[size]} border-[#980404] border-t-transparent rounded-full animate-spin`} />
            {text && <p className="text-gray-600 text-sm">{text}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
                {spinner}
            </div>
        );
    }

    return spinner;
};

export default Loader;
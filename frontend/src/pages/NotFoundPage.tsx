import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center space-y-6">
                <h1 className="text-9xl font-bold text-[#980404]">404</h1>
                <h2 className="text-3xl font-semibold text-gray-900">Page Not Found</h2>
                <p className="text-gray-600">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Button onClick={() => navigate('/dashboard')}>
                    Go to Dashboard
                </Button>
            </div>
        </div>
    );
};

export default NotFoundPage;
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 w-full">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-[#980404]">Issue Tracker</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, <strong>{user?.name}</strong></span>
            <Button variant="secondary" size="small" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
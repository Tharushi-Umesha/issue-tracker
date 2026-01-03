import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'All Issues', path: '/issues' },
        { name: 'Create Issue', path: '/issues/new' }
    ];

    return (
        <aside className="w-64 bg-white shadow-md h-[calc(100vh-4rem)]">
            <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? 'bg-[#980404] text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`
                        }
                    >
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
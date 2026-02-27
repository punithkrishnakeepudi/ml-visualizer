import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Upload', path: '/upload' },
        { name: 'Analyze', path: '/analyze' },
        { name: 'Recommend', path: '/recommend' },
        { name: 'Visualize', path: '/visualize' },
        { name: 'About', path: '/about' },
    ];

    if (location.pathname === '/visualize') return null; // Hide on visualizer for focus

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <div className="glass px-8 py-3 rounded-2xl border border-surface-800 flex items-center gap-8 shadow-2xl backdrop-blur-2xl">
                <Link to="/" className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-indigo-500 mr-4">
                    MLV
                </Link>
                <div className="flex items-center gap-6">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`text-sm font-medium transition-colors ${location.pathname === item.path ? 'text-primary-400' : 'text-surface-400 hover:text-white'}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

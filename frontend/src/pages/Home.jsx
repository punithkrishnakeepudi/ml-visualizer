import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-500 mb-6">
                ML Visualizer
            </h1>
            <p className="text-xl text-surface-400 mb-8 text-center max-w-2xl">
                The browser-based teaching platform that makes machine learning visible, interactive, and explainable.
            </p>
            <div className="flex gap-4">
                <Link
                    to="/upload"
                    className="px-8 py-3 bg-primary-600 hover:bg-primary-500 rounded-lg font-semibold transition-all"
                >
                    Get Started
                </Link>
                <button className="px-8 py-3 glass hover:bg-white/10 rounded-lg font-semibold transition-all">
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default Home;

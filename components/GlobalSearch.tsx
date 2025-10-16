import React, { useState } from 'react';
import { ICONS } from '../constants';

const GlobalSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        // In a real app, this would trigger a global search context/API call
        console.log('Searching for:', searchTerm);
    };

    return (
        <form onSubmit={handleSearch} className="relative">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search project..."
                className="w-64 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                {ICONS.search}
            </div>
        </form>
    );
};

export default GlobalSearch;

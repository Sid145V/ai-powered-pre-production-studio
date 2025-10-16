import React from 'react';
import { User } from '../types';
import GlobalSearch from './GlobalSearch';
import Notifications from './Notifications';

interface HeaderProps {
    user: User;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
    return (
        <header className="bg-black/10 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-between flex-shrink-0">
            <div>
                {/* Could add breadcrumbs or page title here */}
            </div>
            <div className="flex items-center space-x-4">
                <GlobalSearch />
                <Notifications />
                
                <div className="relative group">
                    <button className="flex items-center space-x-2">
                        <img 
                            src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=0D8ABC&color=fff`} 
                            alt={user.name}
                            className="w-9 h-9 rounded-full"
                        />
                         <div className='text-left'>
                            <p className="text-sm font-semibold">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                         </div>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-[#1f1f1f] border border-white/10 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible z-10">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Profile</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Billing</a>
                        <div className="border-t border-white/10 my-1"></div>
                        <button 
                            onClick={onLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                        >
                            Log Out
                        </button>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;

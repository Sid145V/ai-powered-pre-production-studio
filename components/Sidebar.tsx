import React from 'react';
import { ICONS } from '../constants';

type Page = 'dashboard' | 'research' | 'media' | 'script-editor' | 'storyboard' | 'collaboration' | 'settings';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const navItems: { id: Page; name: string; icon: React.ReactElement }[] = [
  { id: 'dashboard', name: 'Dashboard', icon: ICONS.dashboard },
  { id: 'research', name: 'Research Hub', icon: ICONS.research },
  { id: 'media', name: 'Media Upload', icon: ICONS.media },
  { id: 'script-editor', name: 'Script Editor', icon: ICONS['script-editor'] },
  { id: 'storyboard', name: 'Storyboard', icon: ICONS.storyboard },
  { id: 'collaboration', name: 'Collaboration', icon: ICONS.collaboration },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="w-64 bg-black/30 backdrop-blur-lg border-r border-white/10 p-4 flex flex-col">
      <div className="flex items-center space-x-2 p-4 mb-6">
        <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-amber-500 rounded-lg"></div>
        <h1 className="text-xl font-bold tracking-wider text-white">CINE-AI</h1>
      </div>
      <div className="flex-1 space-y-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentPage === item.id
                ? 'bg-cyan-500/20 text-cyan-300'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="w-6 h-6">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      <div className="mt-auto space-y-2">
         <button
            onClick={() => setCurrentPage('settings')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentPage === 'settings'
                ? 'bg-cyan-500/20 text-cyan-300'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="w-6 h-6">{ICONS.settings}</span>
            <span>Settings</span>
          </button>
      </div>
    </nav>
  );
};

export default Sidebar;

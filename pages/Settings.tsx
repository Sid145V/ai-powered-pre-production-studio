import React from 'react';
import { User } from '../types';

interface SettingsProps {
    user: User;
    onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onLogout }) => {
    return (
        <div className="animate-fadeIn max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white tracking-wide mb-8">Settings</h2>

            {/* Profile Settings */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-semibold text-amber-500 mb-6">Profile</h3>
                <div className="flex items-center space-x-6">
                    <img
                        src={user.avatarUrl}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full"
                    />
                    <div>
                        <button className="px-4 py-2 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 transition-colors text-sm">
                            Change Avatar
                        </button>
                        <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <label className="text-sm font-medium text-gray-300">Full Name</label>
                        <input type="text" defaultValue={user.name} className="mt-2 w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-300">Email Address</label>
                        <input type="email" defaultValue={user.email} disabled className="mt-2 w-full bg-gray-900/80 border border-gray-700 rounded-lg p-3 text-sm text-gray-400 cursor-not-allowed" />
                    </div>
                </div>
                 <div className="flex justify-end mt-6">
                    <button className="px-5 py-2.5 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>

             {/* Danger Zone */}
            <div className="bg-red-900/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h3>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-semibold">Log Out</p>
                        <p className="text-sm text-gray-400">You will be returned to the login screen.</p>
                    </div>
                     <button
                        onClick={onLogout}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors"
                    >
                        Log Out
                    </button>
                </div>
                 <div className="border-t border-red-500/20 my-6"></div>
                 <div className="flex justify-between items-center">
                    <div>
                        <p className="font-semibold">Delete Account</p>
                        <p className="text-sm text-gray-400">Permanently delete your account and all of its data.</p>
                    </div>
                     <button className="px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-700/80 text-white font-semibold transition-colors">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;

import React from 'react';
import { Notification } from '../types';

const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 1, message: "Mark reviewed the 'Coffee Shop' scene.", timestamp: '2 hours ago', read: false },
    { id: 2, message: "New comment on 'INT. LAB - DAY' storyboard.", timestamp: '5 hours ago', read: false },
    { id: 3, message: "Task 'Finalize shot list' is due tomorrow.", timestamp: '1 day ago', read: true },
];

const Notifications: React.FC = () => {
    const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

    return (
        <div className="relative group">
            <button className="p-2 rounded-full hover:bg-white/10 relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-black/50"></span>
                )}
            </button>
            <div className="absolute right-0 mt-2 w-80 bg-[#1f1f1f] border border-white/10 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible z-10">
                <div className="p-3 font-semibold border-b border-white/10">Notifications</div>
                <div className="max-h-80 overflow-y-auto">
                    {MOCK_NOTIFICATIONS.map(notification => (
                        <div key={notification.id} className={`p-3 text-sm flex items-start space-x-3 hover:bg-white/5 ${!notification.read ? '' : 'opacity-60'}`}>
                           {!notification.read && <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></div>}
                           <div className={notification.read ? 'pl-5' : ''}>
                               <p className="text-gray-200">{notification.message}</p>
                               <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                           </div>
                        </div>
                    ))}
                </div>
                 <div className="p-2 text-center border-t border-white/10">
                    <button className="text-sm text-cyan-400 hover:underline">View all</button>
                </div>
            </div>
        </div>
    );
};

export default Notifications;

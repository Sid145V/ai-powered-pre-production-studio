import React from 'react';
import { useData } from '../contexts/DataContext';
import { ICONS } from '../constants';
import { KanbanTask } from '../types';

const Dashboard: React.FC = () => {
    const { scriptLines, storyboardPanels, kanbanData, researchDocs, loading } = useData();

    if (loading) {
        return <div>Loading dashboard...</div>;
    }

    const todoTasks: KanbanTask[] = kanbanData.todo?.tasks || [];
    const inProgressTasks: KanbanTask[] = kanbanData['in-progress']?.tasks || [];

    const recentActivity = [
        "Scene 5 dialogue draft marked for review.",
        "New research document 'Ancient Runes.pdf' added.",
        "Storyboard panel for INT. LAB - DAY generated.",
    ];

    return (
        <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold text-white tracking-wide mb-6">Production Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Script Progress" 
                    value={`${scriptLines.length} Lines`} 
                    icon={ICONS['script-editor']} 
                    detail={`${scriptLines.filter(l => l.type === 'scene').length} scenes`}
                />
                <StatCard 
                    title="Storyboard Panels" 
                    value={`${storyboardPanels.length} Panels`} 
                    icon={ICONS.storyboard}
                    detail="Ready for review"
                />
                <StatCard 
                    title="Research Documents" 
                    value={`${researchDocs.length} Docs`}
                    icon={ICONS.research}
                    detail={`${researchDocs.filter(d => d.summary).length} summarized`}
                />
                <StatCard 
                    title="Active Tasks" 
                    value={`${todoTasks.length + inProgressTasks.length} Tasks`}
                    icon={ICONS.collaboration}
                    detail={`${inProgressTasks.length} in progress`}
                />
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-amber-500">Upcoming Tasks</h3>
                    <div className="space-y-3">
                        {todoTasks.slice(0, 4).map(task => (
                            <div key={task.id} className="bg-white/5 p-3 rounded-lg flex items-center">
                                <div className="w-5 h-5 border-2 border-cyan-400 rounded-full mr-4"></div>
                                <p>{task.content}</p>
                            </div>
                        ))}
                         {todoTasks.length === 0 && <p className="text-gray-500">No tasks in 'To Do'.</p>}
                    </div>
                </div>

                <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-amber-500">Recent Activity</h3>
                    <ul className="space-y-3">
                        {recentActivity.map((activity, index) => (
                             <li key={index} className="flex items-start text-sm">
                                <span className="text-cyan-400 mr-2 mt-1">&#8227;</span>
                                <span className="text-gray-300">{activity}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
};

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactElement;
    detail: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, detail }) => {
    return (
        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-300">{title}</h4>
                <div className="text-cyan-400">{icon}</div>
            </div>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{detail}</p>
        </div>
    )
}

export default Dashboard;

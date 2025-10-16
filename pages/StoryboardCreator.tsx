import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { ICONS } from '../constants';
import { geminiService } from '../services/geminiService';
import { StoryboardPanel } from '../types';

const StoryboardCreator: React.FC = () => {
    const { storyboardPanels, scriptLines, updateStoryboardPanel, loading } = useData();
    const [editingPanel, setEditingPanel] = useState<StoryboardPanel | null>(null);

    const getScriptLineContent = (lineId: number) => {
        return scriptLines.find(line => line.id === lineId)?.content || 'Script line not found.';
    };

    const handleGenerateImage = async (panel: StoryboardPanel) => {
        const panelToUpdate = editingPanel && editingPanel.id === panel.id ? editingPanel : panel;

        await updateStoryboardPanel({ ...panelToUpdate, generating: true });

        const imageUrl = await geminiService.generateStoryboardImage(panelToUpdate.prompt);
        
        await updateStoryboardPanel({ ...panelToUpdate, imageUrl, generating: false });
        
        if (editingPanel?.id === panel.id) {
            setEditingPanel(p => p ? { ...p, imageUrl, generating: false } : null);
        }
    };

    if (loading) return <p>Loading storyboards...</p>;

    return (
        <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold text-white tracking-wide mb-6">Storyboard Creator</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {storyboardPanels.map(panel => (
                    <div key={panel.id} className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col">
                        <div className="relative aspect-video bg-black/30 rounded-lg mb-4">
                           {panel.generating ? (
                               <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                    <svg className="animate-spin h-8 w-8 text-cyan-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Generating Image...</span>
                               </div>
                           ) : (
                                <img src={panel.imageUrl} alt={`Storyboard panel for script line ${panel.scriptLineId}`} className="w-full h-full object-cover rounded-lg" />
                           )}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-amber-400 font-mono mb-2">ACTION</p>
                            <p className="text-sm text-gray-300 mb-3 italic">"{getScriptLineContent(panel.scriptLineId)}"</p>
                            <p className="text-xs text-cyan-400 font-mono mb-1">NOTES</p>
                            <p className="text-sm text-gray-400 mb-4">{panel.notes}</p>
                        </div>
                         <div className="mt-auto">
                             <div className="bg-white/5 rounded-lg p-3">
                                <label className="text-xs font-semibold text-gray-400">AI Prompt</label>
                                 <textarea
                                    value={editingPanel?.id === panel.id ? editingPanel.prompt : panel.prompt}
                                    onChange={(e) => {
                                        const currentPanel = editingPanel && editingPanel.id === panel.id ? editingPanel : panel;
                                        setEditingPanel({ ...currentPanel, prompt: e.target.value });
                                    }}
                                    className="w-full bg-transparent text-sm text-gray-200 mt-1 resize-none focus:outline-none"
                                    rows={3}
                                />
                             </div>
                            <button
                                onClick={() => handleGenerateImage(panel)}
                                disabled={panel.generating}
                                className="mt-3 w-full flex items-center justify-center p-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors font-bold text-sm disabled:bg-gray-600 disabled:cursor-not-allowed text-white"
                            >
                                {panel.generating ? 'Generating...' : 'Generate Image'}
                                <span className="ml-2">{ICONS.sparkles}</span>
                            </button>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoryboardCreator;

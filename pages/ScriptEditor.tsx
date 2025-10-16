import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { ScriptLine } from '../types';
import { ICONS } from '../constants';
import { geminiService } from '../services/geminiService';

const ScriptEditor: React.FC = () => {
    const { scriptLines, updateScriptLine, loading } = useData();
    const [selectedLine, setSelectedLine] = useState<ScriptLine | null>(null);
    const [suggestion, setSuggestion] = useState<string | null>(null);
    const [isImproving, setIsImproving] = useState(false);

    const handleLineClick = (line: ScriptLine) => {
        setSelectedLine(line);
        setSuggestion(null);
    };

    const handleImproveScript = async () => {
        if (!selectedLine) return;
        setIsImproving(true);
        const result = await geminiService.improveScript(selectedLine.content);
        setSuggestion(result);
        setIsImproving(false);
    };
    
    const getLineClass = (type: ScriptLine['type']) => {
        switch (type) {
            case 'scene':
                return 'bg-gray-800 font-bold uppercase p-2 my-4 rounded';
            case 'action':
                return 'my-2';
            case 'character':
                return 'mt-4 text-center';
            case 'dialogue':
                return 'text-center';
            case 'parenthetical':
                return 'text-center text-gray-400';
            default:
                return '';
        }
    };

    if (loading) return <p>Loading script...</p>;

    return (
        <div className="flex h-full animate-fadeIn space-x-8">
            <div className="flex-1 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 overflow-y-auto">
                <h2 className="text-3xl font-bold text-white tracking-wide mb-6">Script Editor</h2>
                <div className="font-mono text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto">
                    {scriptLines.map(line => (
                        <p 
                            key={line.id} 
                            className={`${getLineClass(line.type)} ${selectedLine?.id === line.id ? 'bg-cyan-500/10' : ''}`}
                            onClick={() => handleLineClick(line)}
                        >
                            {line.content}
                        </p>
                    ))}
                </div>
            </div>
            
            <div className="w-1/3 max-w-sm">
                <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 sticky top-8">
                    <h3 className="text-2xl font-semibold mb-4 text-amber-500">AI Assistant</h3>
                    {selectedLine ? (
                        <div>
                            <p className="text-gray-400 mb-2 text-sm">Selected Line:</p>
                            <div className="bg-white/5 p-3 rounded-lg mb-4">
                                <p className="italic">"{selectedLine.content}"</p>
                            </div>
                            <button 
                                onClick={handleImproveScript}
                                disabled={isImproving}
                                className="w-full flex items-center justify-center p-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors font-bold disabled:bg-gray-600 disabled:cursor-not-allowed text-white"
                            >
                                {isImproving ? 'Improving...' : 'Improve with AI'}
                                <span className="ml-2">{ICONS.sparkles}</span>
                            </button>
                            {isImproving && <p className="text-center mt-4 text-gray-400">AI is thinking...</p>}
                            {suggestion && (
                                <div className="mt-6">
                                    <p className="text-gray-400 mb-2 text-sm">Suggestion:</p>
                                    <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/30">
                                        <p>{suggestion}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-500">Select a line from the script to get AI-powered suggestions.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScriptEditor;

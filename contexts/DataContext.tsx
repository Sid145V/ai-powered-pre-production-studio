import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockDBService } from '../services/mockDBService';
import { KanbanColumn, ResearchDocument, ScriptLine, StoryboardPanel } from '../types';

interface IDataContext {
    scriptLines: ScriptLine[];
    storyboardPanels: StoryboardPanel[];
    researchDocs: ResearchDocument[];
    kanbanData: { [key: string]: KanbanColumn };
    loading: boolean;
    updateKanbanData: (newData: { [key: string]: KanbanColumn }) => Promise<void>;
    addResearchDocument: (doc: Omit<ResearchDocument, 'id' | 'summary'>) => Promise<void>;
    deleteResearchDocument: (id: number) => Promise<void>;
    updateScriptLine: (line: ScriptLine) => Promise<void>;
    updateStoryboardPanel: (panel: StoryboardPanel) => Promise<void>;
}

const DataContext = createContext<IDataContext | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [scriptLines, setScriptLines] = useState<ScriptLine[]>([]);
    const [storyboardPanels, setStoryboardPanels] = useState<StoryboardPanel[]>([]);
    const [researchDocs, setResearchDocs] = useState<ResearchDocument[]>([]);
    const [kanbanData, setKanbanData] = useState<{ [key: string]: KanbanColumn }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [scripts, storyboards, research, kanban] = await Promise.all([
                    mockDBService.getScriptLines(),
                    mockDBService.getStoryboardPanels(),
                    mockDBService.getResearchDocuments(),
                    mockDBService.getKanbanData(),
                ]);
                setScriptLines(scripts);
                setStoryboardPanels(storyboards);
                setResearchDocs(research);
                setKanbanData(kanban);
            } catch (error) {
                console.error("Failed to fetch initial data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const updateKanbanData = async (newData: { [key: string]: KanbanColumn }) => {
        setKanbanData(newData); // Optimistic update
        await mockDBService.updateKanbanData(newData);
    };
    
    const addResearchDocument = async (doc: Omit<ResearchDocument, 'id' | 'summary'>) => {
        const newDoc = await mockDBService.addResearchDocument(doc);
        setResearchDocs(prev => [newDoc, ...prev]);
    };

    const deleteResearchDocument = async (id: number) => {
        setResearchDocs(prev => prev.filter(d => d.id !== id)); // Optimistic update
        await mockDBService.deleteResearchDocument(id);
    };

    const updateScriptLine = async (line: ScriptLine) => {
        setScriptLines(prev => prev.map(l => l.id === line.id ? line : l));
        await mockDBService.updateScriptLine(line);
    };

    const updateStoryboardPanel = async (panel: StoryboardPanel) => {
        setStoryboardPanels(prev => prev.map(p => p.id === panel.id ? panel : p));
        await mockDBService.updateStoryboardPanel(panel);
    };


    const value = {
        scriptLines,
        storyboardPanels,
        researchDocs,
        kanbanData,
        loading,
        updateKanbanData,
        addResearchDocument,
        deleteResearchDocument,
        updateScriptLine,
        updateStoryboardPanel,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

import { MOCK_KANBAN_DATA, MOCK_RESEARCH_DOCS, MOCK_SCRIPT_LINES, MOCK_STORYBOARD_PANELS, MOCK_TRANSCRIPT_SEGMENTS } from "../constants";
import { KanbanColumn, ResearchDocument, ScriptLine, StoryboardPanel, TranscriptSegment } from "../types";

// In a real app, this would be a class that interacts with a database.
// Here, we're just simulating it with in-memory data.

let scriptLines: ScriptLine[] = MOCK_SCRIPT_LINES;
let storyboardPanels: StoryboardPanel[] = MOCK_STORYBOARD_PANELS;
let transcriptSegments: TranscriptSegment[] = MOCK_TRANSCRIPT_SEGMENTS;
let researchDocs: ResearchDocument[] = MOCK_RESEARCH_DOCS;
let kanbanData: { [key: string]: KanbanColumn } = MOCK_KANBAN_DATA;


const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockDBService = {
    getScriptLines: async (): Promise<ScriptLine[]> => {
        await sleep(200);
        return [...scriptLines];
    },
    getStoryboardPanels: async (): Promise<StoryboardPanel[]> => {
        await sleep(200);
        return [...storyboardPanels];
    },
    getTranscriptSegments: async (): Promise<TranscriptSegment[]> => {
        await sleep(200);
        return [...transcriptSegments];
    },
    getResearchDocuments: async (): Promise<ResearchDocument[]> => {
        await sleep(200);
        return [...researchDocs];
    },
    getKanbanData: async (): Promise<{ [key: string]: KanbanColumn }> => {
        await sleep(200);
        return JSON.parse(JSON.stringify(kanbanData));
    },
    updateKanbanData: async (newData: { [key: string]: KanbanColumn }): Promise<void> => {
        await sleep(300);
        kanbanData = newData;
    },
    addResearchDocument: async (doc: Omit<ResearchDocument, 'id' | 'summary'>): Promise<ResearchDocument> => {
        await sleep(500);
        const newDoc: ResearchDocument = {
            ...doc,
            id: Math.max(...researchDocs.map(d => d.id)) + 1,
            summary: null,
        };
        researchDocs = [newDoc, ...researchDocs];
        return newDoc;
    },
    deleteResearchDocument: async (id: number): Promise<void> => {
        await sleep(300);
        researchDocs = researchDocs.filter(d => d.id !== id);
    },
    updateScriptLine: async (updatedLine: ScriptLine): Promise<ScriptLine> => {
        await sleep(100);
        scriptLines = scriptLines.map(line => line.id === updatedLine.id ? updatedLine : line);
        return updatedLine;
    },
    updateStoryboardPanel: async (updatedPanel: StoryboardPanel): Promise<StoryboardPanel> => {
        await sleep(100);
        storyboardPanels = storyboardPanels.map(panel => panel.id === updatedPanel.id ? updatedPanel : panel);
        return updatedPanel;
    }
};

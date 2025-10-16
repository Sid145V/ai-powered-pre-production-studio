import React from 'react';
import { KanbanColumn, ResearchDocument, ScriptLine, StoryboardPanel, TranscriptSegment } from './types';

// FIX: Replaced JSX.Element with React.ReactElement to resolve namespace issue.
export const ICONS: { [key: string]: React.ReactElement } = {
  dashboard: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
  research: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>,
  media: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" /></svg>,
  'script-editor': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>,
  storyboard: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>,
  collaboration: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.228a4.5 4.5 0 00-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 001.13-1.897L16.863 4.487M16.863 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" /></svg>,
  settings: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.424.35.534.954.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.332.183-.582.495-.645.87l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37-.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.645-.87l.213-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  sparkles: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.672-2.672L11.25 18l1.938-.648a3.375 3.375 0 002.672-2.672L16.25 13.5l.648 1.938a3.375 3.375 0 002.672 2.672L21.75 18l-1.938.648a3.375 3.375 0 00-2.672 2.672z" /></svg>,
  upload: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>,
  delete: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>,
  search: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
};


export const MOCK_SCRIPT_LINES: ScriptLine[] = [
    { id: 1, type: 'scene', content: 'INT. COFFEE SHOP - DAY' },
    { id: 2, type: 'action', content: 'Sunlight streams through the window. ANNA (30s), focused, types on her laptop. A half-empty mug sits beside it.' },
    { id: 3, type: 'character', content: 'MARK (O.S.)' },
    { id: 4, type: 'dialogue', content: 'Burning the midnight oil? Or is it the morning oil now?' },
    { id: 5, type: 'action', content: 'Anna looks up, startled. MARK (30s), charmingly disheveled, stands there with two fresh coffees.' },
    { id: 6, type: 'character', content: 'ANNA' },
    { id: 7, type: 'dialogue', content: 'Something like that. You\'re a lifesaver.' },
    { id: 8, type: 'scene', content: 'EXT. CITY PARK - DAY' },
    { id: 9, type: 'action', content: 'Anna and Mark walk along a tree-lined path, sipping their coffees.' },
];

export const MOCK_STORYBOARD_PANELS: StoryboardPanel[] = [
    { id: 1, scriptLineId: 2, imageUrl: 'https://picsum.photos/seed/panel1/400/225', notes: 'Wide shot of the coffee shop, establishing the cozy atmosphere. Focus on Anna at her table.', prompt: 'cinematic still, woman in her 30s writing on a laptop in a sunlit coffee shop, cozy atmosphere, depth of field', generating: false },
    { id: 2, scriptLineId: 5, imageUrl: 'https://picsum.photos/seed/panel2/400/225', notes: 'Over-the-shoulder shot from behind Anna, showing Mark arriving with coffees. Capture her surprised expression.', prompt: 'cinematic OTS shot, a man offers coffee to a surprised woman working on a laptop in a cafe, warm lighting', generating: false },
];

export const MOCK_TRANSCRIPT_SEGMENTS: TranscriptSegment[] = [
    { id: 1, speaker: "Interviewer", timestamp: "00:01.23", text: "So, can you tell us about the moment you first discovered the artifact?" },
    { id: 2, speaker: "Dr. Aris", timestamp: "00:04.56", text: "It was... surreal. We'd been digging for weeks in the blistering heat, finding nothing but sand and rock. I was ready to call it a day." },
    { id: 3, speaker: "Dr. Aris", timestamp: "00:11.89", text: "But my intern, a young kid named Leo, shouted. He'd seen a glint of metal. I thought it was just another piece of junk." },
    { id: 4, speaker: "Interviewer", timestamp: "00:18.45", text: "But it wasn't." },
    { id: 5, speaker: "Dr. Aris", timestamp: "00:19.78", text: "No. It was the edge of the chronometer. We spent the next six hours carefully excavating it. My hands were shaking the entire time." },
];

export const MOCK_RESEARCH_DOCS: ResearchDocument[] = [
    { id: 1, title: "History of Ancient Egypt.pdf", type: 'pdf', summary: null, content: "A comprehensive overview of ancient Egyptian history from the early dynastic period to the Roman conquest." },
    { id: 2, title: "Theories on Time Travel", type: 'web', summary: null, content: "Web article discussing various theoretical models of time travel, including wormholes and Tipler cylinders." },
    { id: 3, title: "Field_Notes_Excavation_A7.txt", type: 'txt', summary: null, content: "Raw field notes from the excavation site, detailing daily findings and environmental conditions." },
];

export const MOCK_KANBAN_DATA: { [key: string]: KanbanColumn } = {
    'todo': { id: 'todo', title: 'To Do', tasks: [{id: '1', content: 'Schedule interview with Dr. Aris'}, {id: '2', content: 'Finalize shot list for Act 1'}] },
    'in-progress': { id: 'in-progress', title: 'In Progress', tasks: [{id: '3', content: 'Transcribe first batch of interviews'}] },
    'review': { id: 'review', title: 'In Review', tasks: [{id: '4', content: 'Scene 5 dialogue draft'}] },
    'done': { id: 'done', title: 'Done', tasks: [{id: '5', content: 'Location scout for desert scenes'}] },
};
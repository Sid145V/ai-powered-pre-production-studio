export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface ScriptLine {
  id: number;
  type: 'scene' | 'action' | 'character' | 'dialogue' | 'transition' | 'parenthetical';
  content: string;
}

export interface StoryboardPanel {
  id: number;
  scriptLineId: number;
  imageUrl: string;
  notes: string;
  prompt: string;
  generating: boolean;
}

export interface TranscriptSegment {
  id: number;
  speaker: string;
  timestamp: string;
  text: string;
}

export interface ResearchDocument {
  id: number;
  title: string;
  type: 'pdf' | 'web' | 'txt' | 'img';
  summary: string | null;
  content: string; // URL for web/pdf/img, raw text for txt
}

export interface KanbanTask {
    id: string;
    content: string;
}

export interface KanbanColumn {
    id: string;
    title: string;
    tasks: KanbanTask[];
}

export interface Notification {
  id: number;
  message: string;
  timestamp: string;
  read: boolean;
}

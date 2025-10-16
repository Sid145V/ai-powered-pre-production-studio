
import React, { useState, ChangeEvent } from 'react';
import { ICONS } from '../constants';
import { TranscriptSegment } from '../types';
import { geminiService } from '../services/geminiService';

const parseTranscript = (rawText: string): TranscriptSegment[] => {
    const segments: TranscriptSegment[] = [];
    const lines = rawText.split('\n').filter(line => line.startsWith('['));
    
    lines.forEach((line, index) => {
        // Regex to capture timestamp, speaker, and text
        const match = line.match(/\[(.*?)\]\s(.*?):\s(.*)/);
        if (match) {
            const [, timestamp, speaker, text] = match;
            segments.push({
                id: index + 1,
                timestamp,
                speaker: speaker.trim(),
                text: text.trim(),
            });
        }
    });
    
    return segments;
};

const MediaUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptSegment[] | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
            setTranscript(null);
        }
    };
    
    const handleTranscribe = async () => {
        if (!file) return;
        setIsTranscribing(true);
        setTranscript(null); // Clear previous transcript
        
        const rawTranscription = await geminiService.transcribeAudio(file.name);
        const parsedTranscript = parseTranscript(rawTranscription);
        
        setTranscript(parsedTranscript);
        setIsTranscribing(false);
    };

    return (
        <div className="flex h-full animate-fadeIn space-x-8">
            <div className="w-1/3 flex flex-col">
                <h2 className="text-3xl font-bold text-white tracking-wide mb-6">Interviews & Media</h2>
                <div className="flex-1 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
                        {ICONS.upload}
                    </div>
                    <p className="font-semibold mb-2">Drag & drop audio/video files</p>
                    <p className="text-sm text-gray-400 mb-4">or</p>
                    <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} accept="audio/*,video/*"/>
                    <label htmlFor="file-upload" className="px-4 py-2 bg-amber-500 text-black font-bold rounded-lg cursor-pointer hover:bg-amber-400 transition-colors">
                        Browse Files
                    </label>
                    {file && <p className="mt-4 text-cyan-300 text-sm">Selected: {file.name}</p>}
                </div>
                 {file && (
                    <button 
                        onClick={handleTranscribe} 
                        disabled={isTranscribing}
                        className="mt-6 w-full flex items-center justify-center p-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors font-bold disabled:bg-gray-600 disabled:cursor-not-allowed text-white"
                    >
                        {isTranscribing ? 'Transcribing...' : 'Transcribe with AI'}
                        {!isTranscribing && <span className="ml-2">{ICONS.sparkles}</span>}
                    </button>
                 )}
            </div>

            <div className="flex-1">
                <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-full overflow-y-auto">
                    <h3 className="text-2xl font-semibold mb-4 text-amber-500">Transcript Editor</h3>
                    {isTranscribing && (
                         <div className="flex flex-col items-center justify-center h-full text-gray-400">
                             <svg className="animate-spin h-10 w-10 text-cyan-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                             </svg>
                             <p>AI is processing your audio... this may take a moment.</p>
                         </div>
                    )}
                    {transcript && transcript.length > 0 ? (
                        <div className="space-y-4">
                            {transcript.map(segment => (
                                <div key={segment.id} className="grid grid-cols-[100px_1fr] gap-4">
                                    <div className="text-right">
                                        <p className="font-mono text-sm text-amber-400">{segment.timestamp}</p>
                                        <p className="font-semibold text-cyan-400">{segment.speaker}</p>
                                    </div>
                                    <p className="text-gray-200">{segment.text}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !isTranscribing && <p className="text-gray-500">Upload and transcribe a file to see the results here.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MediaUpload;
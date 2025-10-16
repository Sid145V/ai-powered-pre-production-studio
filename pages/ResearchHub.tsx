import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { ICONS } from '../constants';
import { geminiService } from '../services/geminiService';
import ConfirmationModal from '../components/ConfirmationModal';
import { ResearchDocument } from '../types';


const ResearchHub: React.FC = () => {
    const { researchDocs, deleteResearchDocument, loading } = useData();
    const [selectedDoc, setSelectedDoc] = useState<ResearchDocument | null>(researchDocs[0] || null);
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [summary, setSummary] = useState<string | null>(selectedDoc?.summary || null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [docToDelete, setDocToDelete] = useState<ResearchDocument | null>(null);

    const handleSelectDoc = (doc: ResearchDocument) => {
        setSelectedDoc(doc);
        setSummary(doc.summary);
    };

    const handleSummarize = async () => {
        if (!selectedDoc) return;
        setIsSummarizing(true);
        const result = await geminiService.summarizeText(selectedDoc.content);
        setSummary(result);
        // In a real app, we'd persist this summary:
        // await updateResearchDocument({ ...selectedDoc, summary: result });
        setIsSummarizing(false);
    };

    const openDeleteModal = (doc: ResearchDocument) => {
        setDocToDelete(doc);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (docToDelete) {
            deleteResearchDocument(docToDelete.id);
            if (selectedDoc?.id === docToDelete.id) {
                setSelectedDoc(null);
                setSummary(null);
            }
        }
    };


    return (
        <div className="flex h-full animate-fadeIn space-x-8">
            <div className="w-1/3 flex flex-col">
                <h2 className="text-3xl font-bold text-white tracking-wide mb-6">Research Hub</h2>
                <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex-1 overflow-y-auto">
                    {loading ? <p>Loading documents...</p> : (
                        <div className="space-y-2">
                        {researchDocs.map(doc => (
                            <div 
                                key={doc.id}
                                onClick={() => handleSelectDoc(doc)}
                                className={`p-3 rounded-lg cursor-pointer transition-colors flex justify-between items-center ${selectedDoc?.id === doc.id ? 'bg-cyan-500/20' : 'hover:bg-white/5'}`}
                            >
                                <div>
                                    <p className="font-semibold text-gray-200">{doc.title}</p>
                                    <p className="text-sm text-gray-500 uppercase">{doc.type}</p>
                                </div>
                                 <button onClick={(e) => { e.stopPropagation(); openDeleteModal(doc); }} className="text-gray-500 hover:text-red-400 p-1 opacity-50 hover:opacity-100 transition-colors">
                                    {ICONS.delete}
                                </button>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1">
                <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-full overflow-y-auto">
                   {selectedDoc ? (
                    <div>
                        <h3 className="text-2xl font-semibold mb-2 text-amber-500">{selectedDoc.title}</h3>
                        <p className="text-gray-400 mb-6">Type: <span className="font-mono bg-white/10 px-2 py-1 rounded">{selectedDoc.type}</span></p>

                        <div className="mb-6">
                            <button
                                onClick={handleSummarize}
                                disabled={isSummarizing}
                                className="inline-flex items-center justify-center px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors font-bold disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm"
                            >
                                {isSummarizing ? 'Summarizing...' : 'Summarize with AI'}
                                <span className="ml-2 w-4 h-4">{ICONS.sparkles}</span>
                            </button>
                        </div>
                        
                        {isSummarizing && <p className="text-gray-400 my-4">Generating summary...</p>}

                        {summary && (
                            <div className="bg-black/20 p-4 rounded-lg mb-6">
                                <h4 className="font-bold text-lg mb-2 text-cyan-400">AI Summary</h4>
                                <p className="text-gray-300 whitespace-pre-wrap">{summary}</p>
                            </div>
                        )}

                        <div className="bg-black/20 p-4 rounded-lg">
                            <h4 className="font-bold text-lg mb-2 text-cyan-400">Content</h4>
                            <p className="text-gray-300 font-mono text-sm">{selectedDoc.content}</p>
                        </div>

                    </div>
                   ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Select a document to view its details.</p>
                    </div>
                   )}
                </div>
            </div>
             <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Document"
                message={`Are you sure you want to permanently delete "${docToDelete?.title}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default ResearchHub;

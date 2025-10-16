import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useData } from '../contexts/DataContext';
import { KanbanColumn } from '../types';

const Collaboration: React.FC = () => {
    const { kanbanData, updateKanbanData, loading } = useData();

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceColId = source.droppableId;
        const destColId = destination.droppableId;

        const startCol = kanbanData[sourceColId];
        const finishCol = kanbanData[destColId];

        if (startCol === finishCol) {
            // Moving within the same column
            const newTasks = Array.from(startCol.tasks);
            const [removed] = newTasks.splice(source.index, 1);
            newTasks.splice(destination.index, 0, removed);

            const newCol: KanbanColumn = {
                ...startCol,
                tasks: newTasks,
            };
            
            const newData = { ...kanbanData, [newCol.id]: newCol };
            updateKanbanData(newData);

        } else {
            // Moving to a different column
            const startTasks = Array.from(startCol.tasks);
            const [removed] = startTasks.splice(source.index, 1);
            const newStartCol: KanbanColumn = {
                ...startCol,
                tasks: startTasks,
            };

            const finishTasks = Array.from(finishCol.tasks);
            finishTasks.splice(destination.index, 0, removed);
            const newFinishCol: KanbanColumn = {
                ...finishCol,
                tasks: finishTasks,
            };

            const newData = {
                ...kanbanData,
                [newStartCol.id]: newStartCol,
                [newFinishCol.id]: newFinishCol,
            };
            updateKanbanData(newData);
        }
    };

    if (loading) return <p>Loading collaboration board...</p>;

    return (
        <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold text-white tracking-wide mb-6">Collaboration & Tasks</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-4 gap-6">
                    {Object.values(kanbanData).map(column => (
                        <div key={column.id} className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col">
                            <h3 className="text-lg font-bold text-amber-500 mb-4 px-2">{column.title}</h3>
                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`flex-1 space-y-3 p-2 rounded-lg transition-colors ${snapshot.isDraggingOver ? 'bg-cyan-500/10' : ''}`}
                                    >
                                        {column.tasks.map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`bg-black/40 border border-white/10 p-4 rounded-lg shadow-md ${snapshot.isDragging ? 'ring-2 ring-cyan-500' : ''}`}
                                                    >
                                                        <p className="text-gray-200">{task.content}</p>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default Collaboration;

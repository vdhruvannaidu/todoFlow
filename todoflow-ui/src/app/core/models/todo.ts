export interface todo{
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    dueDate?: Date;
    priority?: 'low' | 'medium' | 'high';
    tags?: string[];
}
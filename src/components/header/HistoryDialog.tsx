import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { History } from 'lucide-react';
import React from 'react';

export const HistoryDialog: React.FC = () => (
    <Dialog>
        <DialogTrigger asChild>
            <History className='w-8 h-8 text-white cursor-pointer' />
        </DialogTrigger>
        <DialogContent showCloseButton>
            <DialogTitle className='text-lg font-semibold text-center mb-4'>История</DialogTitle>
            <DialogDescription className='sr-only'>Здесь отображается история ваших вопросов.</DialogDescription>
            <p className='text-center text-muted-foreground'>История пуста</p>
        </DialogContent>
    </Dialog>
); 
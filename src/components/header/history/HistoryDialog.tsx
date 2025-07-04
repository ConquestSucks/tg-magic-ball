import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { History } from 'lucide-react';
import React from 'react';
import HistoryItem from './HistoryItem';

export const HistoryDialog: React.FC<HistoryDialogProps> = ({ history }) => (
    <Dialog>
        <DialogTrigger asChild>
            <History className='w-8 h-8 text-white cursor-pointer' />
        </DialogTrigger>
        <DialogContent showCloseButton className='max-h-[301px]'>
            <DialogTitle className='text-lg font-semibold text-center mb-4'>История</DialogTitle>
            <DialogDescription className='sr-only'>Здесь отображается история ваших вопросов.</DialogDescription>
            {!history.length && <p className='text-center text-muted-foreground'>История пуста</p>}
            <div className='flex flex-col p-0 gap-1 max-h-[190px] overflow-auto rounded-md'>
                {history.map((item, id) => <HistoryItem key={id} data={item}/> )}
            </div>
        </DialogContent>
    </Dialog>
); 
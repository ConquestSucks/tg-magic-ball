import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type React from "react"

const HistoryItem: React.FC<HistoryItemProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-2 w-full p-2 border border-solid rounded-xl duration-300 hover:border-blue-500 active:hover:border-blue-500">
            <span className="truncate">Вопрос: {data.question}</span>
            <Dialog>
                <DialogTrigger asChild>
                   <span className="ml-auto cursor-pointer">Посмотреть</span> 
                </DialogTrigger>
                <DialogContent showCloseButton className='max-h-[301px]'>
                    <DialogTitle className='text-lg font-semibold text-center mb-4'>{data.question}</DialogTitle>
                    <DialogDescription className='sr-only'>Здесь отображается история ваших вопросов.</DialogDescription>
                    <span>Ответ магического шара:</span>
                    <div className="h-[150px] overflow-auto rounded-md">{data.answer}</div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default HistoryItem
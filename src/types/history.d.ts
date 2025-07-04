interface HistoryItem {
    question: string;
    answer: string
}

interface HistoryItemProps {
    data: {
        question: string;
        answer: string
    }
}

interface HistoryDialogProps {
    history: Array<HistoryItem>
}

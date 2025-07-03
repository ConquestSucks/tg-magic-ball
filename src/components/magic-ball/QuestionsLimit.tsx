import type { QuestionsLimitProps } from '../../types/magic-ball';
import { StarsDialog } from '../stars/StarsDialog';

export const QuestionsLimit: React.FC<QuestionsLimitProps> = ({ questionsLeft }) => {
    return (
        <div className="absolute text-white text-center mt-110 font-semibold drop-shadow-lg select-none z-10">
            {questionsLeft && questionsLeft != 0 && <span>Осталось вопросов: {questionsLeft}</span>}
            {!questionsLeft && <StarsDialog />}
            <span className='flex items-center gap-1 justify-center'>Баланс: 0 <img src="star.png" className='w-[20px] h-[20px]' /></span>
        </div>
    );
}
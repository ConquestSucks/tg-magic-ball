import { getQuestionWord } from '@/lib/getQuestionWord';
import React from 'react'

interface StarsItemProps {
    data: {
        count: number;
        price: number;
    };
    onclick: () => void
}

const StarsItem: React.FC<StarsItemProps> = ({ data, onclick }) => {
  return (
    <div onClick={onclick}
        className='flex gap-2 p-2 rounded-md border border-solid duration-300 active:border-black hover:border-black'>
        <span>{data.count} {getQuestionWord(data.count)}</span> -
        <span className='flex gap-1 items-center'>{data.price} <img src="star.png" className='w-[15px] h-[15px]'/></span>
    </div>
  )
}

export default StarsItem
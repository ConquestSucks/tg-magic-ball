
import React, { useState } from 'react'
import { HistoryDialog } from './history/HistoryDialog'
import { ProfileDialog } from './profile/ProfileDialog'
import type { TelegramUser } from '@/types/telegramUser'

interface TopBarProps {
    user?: TelegramUser 
}

export const TopBar: React.FC<TopBarProps> = ({ user }) => {
    const [name, setName] = useState(user?.first_name ?? '')
    const [sex, setSex] = useState<string>()
    const [date, setDate] = useState<Date>()
    return (
        <div className='w-full flex items-center justify-between px-4 py-2 select-none'>
            <HistoryDialog history={[]}/>

            <h1 className='text-white font-bold flex-1 text-center'>ASK THE ORB</h1>

            <ProfileDialog
                user={user}
                name={name}
                setName={setName}
                sex={sex}
                setSex={setSex}
                date={date}
                setDate={setDate}
            />
        </div>
    )
} 
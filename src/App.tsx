import './App.css'
import MagicBall from './components/magic-ball/MagicBall'
import { observer } from "mobx-react"
import { TopBar } from './components/header/TopBar';
import { useEffect } from 'react';
import { initData } from './lib/api';
import { useRawInitData } from '@telegram-apps/sdk-react';
import { userStorage } from './store/userStorage';
import { chatStorage } from './store/chatStorage';

const App = observer(() => {
    const tgData = useRawInitData()
    if (tgData) userStorage.setRawData(tgData)
    const user = userStorage.telegramUser;

    useEffect(() => {
        const storeUserData = async() => {
            const serverResponse = (await initData(userStorage.rawData)).data
            userStorage.setTelegramUser(serverResponse.telegramUser)
            userStorage.setUser(serverResponse.user)
            chatStorage.setQuestionLimit(userStorage.user?.dailyLimit)
            chatStorage.setQuestionsToday(userStorage.user?.requestsToday)
        }

        storeUserData()
    },[tgData])

    return (
        <div className='flex flex-col h-screen bg-linear-to-t from-sky-500 to-indigo-500'>
            <TopBar user={user}/>
            <div className='flex-1 flex items-center justify-center'>
                <MagicBall width={220} height={220} />
            </div>
        </div>
    )
})

export default App

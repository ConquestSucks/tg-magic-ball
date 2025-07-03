import './App.css'
import MagicBall from './components/magic-ball/MagicBall'
import { observer } from "mobx-react"
import { TopBar } from './components/header/TopBar';
import { useEffect } from 'react';
import { initData } from './lib/api';
import { useRawLaunchParams, useRawInitData } from '@telegram-apps/sdk-react';
import { userStorage } from './store/userStorage';

const App = observer(() => {
    const tgData = useRawLaunchParams()
    userStorage.setRawData(tgData)
    const user = userStorage.telegramUser;

    useEffect(() => {
        const storeUserData = async() => {
            const serverResponse = (await initData(userStorage.rawDataAsHeader)).data
            userStorage.setTelegramUser(serverResponse.telegramUser)
            userStorage.setUser(serverResponse.user)
        }

        storeUserData()

        console.log(useRawInitData());
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

import './App.css'
import MagicBall from './components/magic-ball/MagicBall'
import NavMenu from './components/navbar/NavMenu'
import { observer } from "mobx-react"
import { useState, useEffect } from 'react'

const App = observer(() => {
    const [vhOffset, setVhOffset] = useState(0)

    useEffect(() => {
        const handler = () => {
            const visual = window.visualViewport
            if (!visual) return
            setVhOffset(window.innerHeight - visual.height)  // высота клавиатуры
        }
        window.visualViewport?.addEventListener('resize', handler)
        return () => window.visualViewport?.removeEventListener('resize', handler)
    }, [])

    return (
        <div className='flex flex-col h-screen items-center justify-between bg-[#3A3939] select-none' style={{ paddingBottom: vhOffset }}>
            <h1>ASK THE ORB</h1>
            <div className="
                relative inline-block
                w-[min(90vw,280px)]
                max-h-[calc(60vh-120px)]
                overflow-y-auto
                px-5 py-4 rounded-3xl shadow-lg bg-white text-black text-sm
            ">
                <MagicBall width={220} height={220} />
            </div>
            <NavMenu />
        </div>
    )
})

export default App

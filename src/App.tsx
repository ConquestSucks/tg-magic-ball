import './App.css'
import MagicBall from './components/magic-ball/MagicBall'
import NavMenu from './components/navbar/NavMenu'
import { observer } from "mobx-react"
import { useEffect } from 'react'

const App = observer(() => {
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tg = (window as any).Telegram?.WebApp
        if (!tg) return

        const applyHeight = () => {
            const h = tg.viewportHeight ?? window.innerHeight
            document.documentElement.style.setProperty('--tg-vh', `${h}px`)
        }

        applyHeight()
        tg.onEvent('viewportChanged', applyHeight)
        return () => tg.offEvent?.('viewportChanged', applyHeight)
    }, [])

    return (
        <div className='flex flex-col items-center justify-between bg-[#3A3939] select-none overflow-auto' style={{ height: 'var(--tg-vh)' }}>
            <h1>ASK THE ORB</h1>
            <MagicBall width={220} height={220} />
            <NavMenu />
        </div>
    )
})

export default App

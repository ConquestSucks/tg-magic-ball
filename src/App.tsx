import './App.css'
import MagicBall from './components/magic-ball/MagicBall'
import { observer } from "mobx-react"
import { TopBar } from './components/header/TopBar';

const App = observer(() => {
    return (
        <div className='flex flex-col h-screen bg-linear-to-t from-sky-500 to-indigo-500'>
            <TopBar />
            <div className='flex-1 flex items-center justify-center'>
                <MagicBall width={220} height={220} />
            </div>
        </div>
    )
})

export default App

import './App.css'
import MagicBall from './components/magic-ball/MagicBall'
import NavMenu from './components/navbar/NavMenu'
import { observer } from "mobx-react"

const App = observer(() => {
    return (
        <div className='flex flex-col h-screen justify-between items-center bg-[#3A3939]'>
            <h1>ASK THE ORB</h1>
            <MagicBall width={220} height={220} />
            <NavMenu />
        </div>
    )
})

export default App

import './App.css'
import MagicBall from './components/magic-ball/MagicBall'
import NavMenu from './components/navbar/NavMenu'

function App() {

    return (
        <div className='flex flex-col h-screen bg-[#3A3939]'>
            <h1>ASK THE ORB</h1>
            <MagicBall />
            <NavMenu />
        </div>
    )
}

export default App

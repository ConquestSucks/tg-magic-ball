import { useLaunchParams } from '@telegram-apps/sdk-react'
import { retrieveRawLaunchParams } from '@telegram-apps/sdk';
import { User as UserIcon } from 'lucide-react'
import { useState } from 'react'
import { HistoryDialog } from './HistoryDialog'
import { ProfileDialog } from './ProfileDialog'

export const TopBar = () => {
    const params = useLaunchParams()
    const user = params?.tgWebAppData?.user
    console.log(retrieveRawLaunchParams())
    const Avatar = user?.photo_url ? (
        <img src={user.photo_url} className='w-8 h-8 rounded-full active:border border-solid' />
    ) : (
        <UserIcon className='w-6 h-6 text-white' />
    )

    const [name, setName] = useState(user?.first_name ?? '')
    const [sex, setSex] = useState<string>()
    const [date, setDate] = useState<Date>()

    return (
        <div className='w-full flex items-center justify-between px-4 py-2'>
            <HistoryDialog />

            <h1 className='text-white font-bold flex-1 text-center'>ASK THE ORB</h1>

            <ProfileDialog
                avatar={Avatar}
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
import { useLaunchParams } from '@telegram-apps/sdk-react'
import { User as UserIcon } from 'lucide-react'

export const TopBar = () => {
  const params = useLaunchParams()
  const user = params?.tgWebAppData?.user

  return (
    <div className='w-full flex items-center justify-between px-4 py-2'>
      <h1 className='text-white font-bold'>ASK THE ORB</h1>
      {user?.photo_url ? (
        <img src={user.photo_url} className='w-8 h-8 rounded-full' />
      ) : (
        <UserIcon className='w-6 h-6 text-white' />
      )}
    </div>
  )
} 
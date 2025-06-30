import { User as UserIcon, History } from 'lucide-react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useSafeLaunchParams } from '@/hooks/useSafeLaunchParams'

export const TopBar = () => {
    const params = useSafeLaunchParams();
    const user = params.tgWebAppData.user;

    const Avatar = user.photo_url
        ? <img src={user.photo_url} className='w-8 h-8 rounded-full' />
        : <UserIcon className='w-6 h-6 text-white' />;

    const [name, setName] = useState(user.first_name)
    const [sex, setSex] = useState<string>()
    const [date, setDate] = useState<Date>()

    return (
        <div className='w-full flex items-center justify-between px-4 py-2'>
            <Dialog>
                <DialogTrigger asChild>
                    <History className='w-6 h-6 text-white cursor-pointer' />
                </DialogTrigger>
                <DialogContent showCloseButton>
                    <DialogTitle className='text-lg font-semibold text-center mb-4'>История</DialogTitle>
                    <DialogDescription>Здесь будет отображаться история ваших вопросов.</DialogDescription>
                    <p className='text-center text-muted-foreground'>История пуста</p>
                </DialogContent>
            </Dialog>

            <h1 className='text-white font-bold flex-1 text-center'>ASK THE ORB</h1>

            <Dialog>
                <DialogTrigger asChild>{Avatar}</DialogTrigger>
                <DialogContent showCloseButton>
                    <DialogTitle className='text-lg font-semibold text-center mb-4'>Профиль</DialogTitle>
                    <DialogDescription>Здесь вы можете изменить свои данные профиля.</DialogDescription>
                    <div className='flex flex-col gap-4'>
                        <Input value={name} onChange={e => setName(e.target.value)} placeholder='Имя' />
                        <Select value={sex} onValueChange={setSex}>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder='Укажите пол' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='male'>Мужчина</SelectItem>
                                    <SelectItem value='female'>Женщина</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant='outline' className='w-full justify-between'>
                                    {date ? date.toLocaleDateString() : 'Укажите дату рождения'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto p-0' align='start'>
                                <Calendar mode='single' selected={date} captionLayout='dropdown' onSelect={setDate} />
                            </PopoverContent>
                        </Popover>
                        <Button disabled={!name || !sex || !date}>Сохранить</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
} 
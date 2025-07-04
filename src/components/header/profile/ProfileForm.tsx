import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import type { ProfileFormProps } from '../../../types/profile';

export const ProfileForm: React.FC<ProfileFormProps> = ({ name, setName, sex, setSex, date, setDate }) => (
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
); 
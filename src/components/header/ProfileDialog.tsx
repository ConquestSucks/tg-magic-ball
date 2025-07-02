import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ProfileForm } from './ProfileForm';
import type { ProfileDialogProps } from '../../types/profile';

export const ProfileDialog: React.FC<ProfileDialogProps> = ({
    avatar,
    name,
    setName,
    sex,
    setSex,
    date,
    setDate,
}) => (
    <Dialog>
        <DialogTrigger asChild>{avatar}</DialogTrigger>
        <DialogContent showCloseButton>
            <DialogTitle className='text-lg font-semibold text-center mb-4'>Профиль</DialogTitle>
            <DialogDescription className='sr-only'>Здесь вы можете изменить свои данные профиля.</DialogDescription>
            <ProfileForm
                name={name}
                setName={setName}
                sex={sex}
                setSex={setSex}
                date={date}
                setDate={setDate}
            />
        </DialogContent>
    </Dialog>
); 
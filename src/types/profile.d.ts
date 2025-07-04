export interface ProfileFormProps {
  name: string;
  setName: (name: string) => void;
  sex?: string;
  setSex: (sex: string) => void;
  date?: Date;
  setDate: (date?: Date) => void;
}

export interface ProfileDialogProps {
  user?: TelegramUser ;
  name: string;
  setName: (name: string) => void;
  sex?: string;
  setSex: (sex: string) => void;
  date?: Date;
  setDate: (date?: Date) => void;
} 

interface AvatarProps {
    user?: TelegramUser
}

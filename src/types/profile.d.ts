export interface ProfileFormProps {
  name: string;
  setName: (name: string) => void;
  sex?: string;
  setSex: (sex: string) => void;
  date?: Date;
  setDate: (date?: Date) => void;
}

export interface ProfileDialogProps {
  avatar: React.ReactNode;
  name: string;
  setName: (name: string) => void;
  sex?: string;
  setSex: (sex: string) => void;
  date?: Date;
  setDate: (date?: Date) => void;
} 
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { useState } from "react"

const NavMenuSettings = () => {
    const [open, setOpen] = useState(false)
    const [sex, setSex] = useState<string | undefined>(undefined)
    const [date, setDate] = useState<Date | undefined>(undefined)

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <img src="navmenu-settings.svg" className="w-[24px] h-[24px] p-[1px] rounded-xl hover:bg-primary active:bg-background duration-300 cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Изменить профиль</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Select onValueChange={setSex}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Укажите пол" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="male">Мужчина</SelectItem>
                                        <SelectItem value="female">Женщина</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild >
                                    <Button
                                        variant="outline"
                                        id="date"
                                        className="justify-between font-normal w-[200px]"
                                    >
                                        {date ? date.toLocaleDateString() : "Укажите дату рождения"}
                                        <ChevronDownIcon className="secondary"/>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        captionLayout="dropdown"
                                        onSelect={(date) => {
                                            setDate(date)
                                            setOpen(false)
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Отменить</Button>
                        </DialogClose>
                        <Button type="submit" disabled={!date || !sex}>Сохранить</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default NavMenuSettings
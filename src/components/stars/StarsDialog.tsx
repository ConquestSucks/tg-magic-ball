
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog"
import StarsItem from "./StarsItem"


interface StarsItem {
    count: number;
    price: number;
}

export const StarsDialog = () => {
    const data: StarsItem[] = [
        { count: 1, price: 50 },
        { count: 3, price: 150 },
        { count: 5, price: 250 },
    ]

    const handleBuy = async () => {
   /*  const linkObject = await invoiceLink()

    const promise = await invoice.open(linkObject.data.link) */

};

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-inherit shadow-none cursor-pointer hover:bg-inherit'>
                    Купить за звёзды
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton>
                <DialogTitle className='text-lg font-semibold text-center mb-4'>Купить за звезды</DialogTitle>
                <DialogDescription className='sr-only'>Здесь вы можете купить вопросы за звезды</DialogDescription>
                {data && data.map((i) => (
                    <StarsItem data={i} onclick={handleBuy}/>
                ))}
            </DialogContent>
        </Dialog>
    )
}
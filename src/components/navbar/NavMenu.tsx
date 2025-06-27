import { Button } from "@/components/ui/button";
import { useState } from "react";
import NavMenuSettings from "./NavMenuSettings";
import { userRequestSettingsStore } from "@/store/userRequestSettingsStore"
import { observer } from "mobx-react";

const NavMenu = observer(() => {
    const [hidden, setHidden] = useState(false);
    const userSettings = userRequestSettingsStore;

    const buttons = [
        { id: 0, label: "Вопрос" },
        { id: 1, label: "Гадание" },
    ];

    const handleButtonClick = (id: number) => userSettings.setAnswerType(id)
    
    return (
        <div
            className={`flex w-full justify-center items-center h-[60px] ${hidden ? "bg-transparent" : "gap-10 py-3 bg-[#353435]"
                }`}
        >
            {!hidden && <NavMenuSettings />}
            {!hidden && (
                <div className="flex gap-4">
                    {buttons.map(({ id, label }) => (
                        <Button
                            key={id}
                            variant={userSettings.AnswerType === id ? "secondary" : "default"}
                            onClick={() => handleButtonClick(id)}
                        >
                            {label}
                        </Button>
                    ))}
                </div>
            )}
            <img
                src={hidden ? "navmenu-show.svg" : "navmenu-hide.svg"}
                className="w-[24px] h-[24px] cursor-pointer"
                onClick={() => setHidden(!hidden)}
                alt="Toggle menu"
            />
        </div>
    );
})

export default NavMenu;

import { Button } from "@/components/ui/button";
import { useState } from "react";
import NavMenuSettings from "./NavMenuSettings";

const NavMenu = () => {
    const [hidden, setHidden] = useState(false);
    const [activeButton, setActiveButton] = useState(0);

    const buttons = [
        { id: 0, label: "Вопрос" },
        { id: 1, label: "Гадание" },
    ];

    return (
        <div
            className={`flex justify-center items-center h-[60px] ${hidden ? "bg-transparent" : "gap-10 py-3 bg-[#353435]"
                }`}
        >
            {!hidden && <NavMenuSettings />}
            {!hidden && (
                <div className="flex gap-4">
                    {buttons.map(({ id, label }) => (
                        <Button
                            key={id}
                            variant={activeButton === id ? "secondary" : "default"}
                            onClick={() => setActiveButton(id)}
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
};

export default NavMenu;

import { BsPiggyBankFill  } from 'react-icons/bs';
import { FaWater, FaCode, FaSun } from 'react-icons/fa';
import { SiRetroarch } from "react-icons/si";
import { GiBlood } from "react-icons/gi";
import { MdNightlight } from 'react-icons/md';
import { AiFillThunderbolt } from 'react-icons/ai';

export interface ThemeTypes {
    name: string
    background: string,
};

export const Styling= {
    night:  {name: "night",   background: "#141414",   icon: MdNightlight },
    ocean:  {name: "ocean",   background: "#171717",   icon: FaWater},
    retro:  {name: "retro",   background: "#1e1e1e",   icon: SiRetroarch},
    matrix: {name: "matrix",  background: "#121111",   icon: FaCode},
    pink:   {name: "pink",    background: "#141414ff", icon: BsPiggyBankFill },
    sun:    {name: "sun",     background: "#181818ff", icon: FaSun },
    blood:  {name: "blood",   background: "#000000",   icon: GiBlood },
    thunder:{name: "thunder", background: "#141414ff", icon: AiFillThunderbolt}
};

export const ThemeCycle = Object.values(Styling).map(theme => theme);
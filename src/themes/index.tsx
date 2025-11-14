import './Themes.scss';
import {createContext, ReactNode, useLayoutEffect, useState} from 'react';
import {theme as themeLocalstorage} from '@localstorage';
import {ThemeTypes, ThemeCycle, Styling} from './Data';

export interface PropsTypes {
    theme: ThemeTypes,
    onSetTheme: () => void,
};

export const Context = createContext<PropsTypes>({
    theme: {
        name: "night",
        background: "black",
    },
    onSetTheme: () => null
});

export const Theme = ({children}: {children: ReactNode}) => {

    const _default_ = Styling.night;

    const saved: ThemeTypes = themeLocalstorage.get();

    const selected = saved || _default_;

    const [theme, setTheme] = useState<ThemeTypes>(selected);

    useLayoutEffect(() => { 
        document.body.style.background = theme.background;
    }, [theme]);

    const onSetTheme = () => {
        const currentIndex = ThemeCycle.findIndex(t => t === theme);
        const nextTheme = currentIndex === -1 ? _default_ : ThemeCycle[(currentIndex + 1) % ThemeCycle.length];
        setTheme(nextTheme);
        themeLocalstorage.set(nextTheme);
    };

    const value: PropsTypes = {
        theme,
        onSetTheme,
    };
  
    return (
        <Context.Provider value={value}>
            <div className={`theme-${theme.name}`}>
                {children}
            </div>
        </Context.Provider>
    )
};

export default Theme;
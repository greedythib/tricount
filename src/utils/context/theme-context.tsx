import {createContext, useState} from "react";

interface IThemeContext{
    isDark: boolean;
    toggleButton?: () => void;
};

const defaultThemeState = {
    isDark: false,
};

export const ThemeContext = createContext<IThemeContext>(defaultThemeState)

export function ThemeProvider({children}: any){
    const [isDarkMode, setIsDarkMode] = useState(false)
    function toggleThemeButton(){
        isDarkMode? setIsDarkMode(false):setIsDarkMode(true);
    }
    return(
        <ThemeContext.Provider
            value = {
                {isDark: isDarkMode, toggleButton: toggleThemeButton}}>
            {children}
        </ThemeContext.Provider>
    )
}


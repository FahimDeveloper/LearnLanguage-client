import { useContext } from "react";
import { ThemeContext } from "../Providers/ThemeProvider";


const useTheme = () => {
    const theme = useContext(ThemeContext)
    return theme;
};

export default useTheme;
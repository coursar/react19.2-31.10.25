import { createContext, useContext, useEffect, useState } from "react"

// custom hooks:
// 1. fn - use other hooks
// 2. usePrefix
const useThemeContext = () => {
    const context = useContext(ThemeContext)
    if (context === null) { // default
        throw new Error('No ThemeContext Provided')
    }

    return context
}

// in separate & export by default
const ThemeContext = createContext(null) // TODO: explain later

// in separate & export by default
const ThemeContextProvider = ({children}) => {
    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        setInterval(() => setTheme(prev => prev === 'dark' ? 'light' : 'dark'), 3000)
        // TODO: clear
    }, [])

    return (
        <>
            {/* React18: ThemeContext.Provider */}
            <ThemeContext value={theme}>
                {children}
            </ThemeContext>
        </>
    ) 
} 


const ThemeContextContainerNoProvider = () => {
    return (
        <>
            {/* <ThemeContextProvider> */}
                <Child>
                    <GrandChild/>
                </Child>
            {/* </ThemeContextProvider> */}
        </>
    )
}

export default ThemeContextContainerNoProvider

const Child = ({children}) => {
    return (
        <>
            {children}
        </>
    )
}

const GrandChild = () => {
    const value = useThemeContext()

    return (
        <>
            GrandChild {value}
        </>
    )
}

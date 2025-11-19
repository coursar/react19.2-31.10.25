import { createContext, useContext, useEffect, useState } from "react"

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


const ThemeContextContainerPrimitive = () => {
    return (
        <>
            <ThemeContextProvider>
                <Child>
                    <GrandChild/>
                </Child>
            </ThemeContextProvider>
        </>
    )
}

export default ThemeContextContainerPrimitive

const Child = ({children}) => {
    return (
        <>
            {children}
        </>
    )
}

const GrandChild = () => {
    const value = useContext(ThemeContext)
    debugger

    return (
        <>
            GrandChild {value}
        </>
    )
}

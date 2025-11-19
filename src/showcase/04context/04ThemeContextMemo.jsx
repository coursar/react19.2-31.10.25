import { createContext, memo, useContext, useEffect, useMemo, useState } from "react"
import ErrorBoundary from "../../uikit/ErrorBoundary/ErrorBoundary"

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
    const [count, setCount] = useState(0)

    const setDarkTheme = () => setTheme('dark')
    const setLightTheme = () => setTheme('light')

    const composedValue = useMemo(() => ({
        theme,
        setDarkTheme,
        setLightTheme,
    }), [theme])

    const handleClick = () => {
        setCount(prev => prev + 1)
    }

    return (
        <>
            {/* React18: ThemeContext.Provider */}
            <ThemeContext value={composedValue}>
                {children}
            </ThemeContext>
            <button onClick={handleClick}>Local Click</button>
        </>
    ) 
} 


const ThemeContextMemo = () => {
    return (
        <>
            <ThemeContextProvider>
                <ErrorBoundary fallback={<div>Oops! Something bad happened...</div>}>
                    <Child>
                        <GrandChild />
                    </Child>
                    <ThemeSwitcher />
                </ErrorBoundary>
            </ThemeContextProvider>
        </>
    )
}

export default ThemeContextMemo

const Child = ({children}) => {
    return (
        <>
            {children}
        </>
    )
}

const GrandChild = () => {
    const {theme} = useThemeContext()

    return (
        <>
            GrandChild {theme}
        </>
    )
}

const ThemeSwitcher = () => {
    const {setDarkTheme, setLightTheme} = useThemeContext()

    return (
        <>
            <button onClick={setDarkTheme}>dark</button>
            <button onClick={setLightTheme}>light</button>
        </>
    )
}


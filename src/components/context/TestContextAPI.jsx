import { createContext, useState } from "react"
export const TestContext = createContext();


export const TestContextProvider = ({ children }) => {
    const [time, setTime] = useState(0);

    function handleTimeCustomize() {
    }
    function handleWordsCustomize() {
    }
    const contextValue = {

    }
    return (
        <TestContext.Provider >{children}</TestContext.Provider>
    )
}
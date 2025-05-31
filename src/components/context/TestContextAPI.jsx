import { createContext, useState } from "react"
export const TestContext = createContext();


export const TestContextProvider = ({ children }) => {

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
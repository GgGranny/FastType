import { createContext, useState } from "react"
export const TestContext = createContext();


export const TestContextProvider = ({ children }) => {
    const [time, setTime] = useState(5);
    const [activeOption, setActiveOption] = useState("time");
    const [activeDuration, setActiveDuration] = useState(5);
    const [acitveWordAmount, setAcitveWordAmount] = useState(30);
    const [showResult, setShowResult] = useState(false);

    function handleTime(str) {
        setActiveOption(str);

    }
    function handleWord(str) {
        setActiveOption(str);
    }
    function handlePunctuation(str) {
        setActiveOption(str);

    }
    function handleNumbers(str) {
        setActiveOption(str);

    }

    function handleDuration(duration) {
        setActiveDuration(duration);
        setTime(duration);
    }

    function handleWordAmount(amount) {
        setAcitveWordAmount(amount);
    }

    function handleTimeCustomize() {
    }
    function handleWordsCustomize() {
    }
    const contextValue = {
        time,
        activeOption,
        activeDuration,
        acitveWordAmount,
        showResult,
        setShowResult,
        handleTime,
        handleWord,
        handlePunctuation,
        handleNumbers,
        handleDuration,
        handleWordAmount,
        handleTimeCustomize,
        handleWordsCustomize
    }
    return (
        <TestContext.Provider value={contextValue}>{children}</TestContext.Provider>
    )
}
import { createContext, useState } from "react"
export const TestContext = createContext();


export const TestContextProvider = ({ children }) => {
    const [time, setTime] = useState(5);
    const [activeOption, setActiveOption] = useState("time");
    const [activeDuration, setActiveDuration] = useState(5);
    const [acitveWordAmount, setAcitveWordAmount] = useState(30);
    const [testType, setTestType] = useState("time");

    function handleTime(str) {
        setActiveOption(str);
        setTestType(str);
    }

    function handleWord(str) {
        setActiveOption(str);
        setTestType(str);
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
        testType,
        activeOption,
        activeDuration,
        acitveWordAmount,
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
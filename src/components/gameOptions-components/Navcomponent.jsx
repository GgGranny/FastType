import { useState } from "react";
import OptionsButtons from "./OptionsButtons";
import { FaTools } from "react-icons/fa";

function Navcomponent() {
    const [activeOption, setActiveOption] = useState("time");
    const [activeDuration, setActiveDuration] = useState(30);
    const [acitveWordAmount, setActiveWordAmount] = useState(30);
    const durations = [15, 30, 45, 50];
    const wordAmount = [10, 25, 30, 50];


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
    }

    function handleWordAmount(amount) {
        setActiveWordAmount(amount);
    }
    return (
        <div className="flex justify-around items-center py-1 px-1 bg-[#5e6572] rounded text-sm">
            <div className="test-type gap-x-10 flex px-3">
                <OptionsButtons onClick={() => handlePunctuation("punctuation")} isActive={activeOption === "punctuation" ? true : false} >punctuation</OptionsButtons>
                <OptionsButtons onClick={() => handleNumbers("numbers")} isActive={activeOption === "numbers" ? true : false} >numbers</OptionsButtons>
            </div>
            <div className="spacer spacer-right"></div>
            <div className="test-options flex gap-x-10  px-3">
                <OptionsButtons onClick={() => handleTime("time")} isActive={activeOption === "time" ? true : false} >time</OptionsButtons>
                <OptionsButtons onClick={() => handleWord("words")} isActive={activeOption === "words" ? true : false}>words</OptionsButtons>
            </div>
            <div className="spacer spacer-left"></div>
            <div className="custom-options flex  gap-x-10">
                {
                    activeOption === "time" && (
                        durations.map((duration, index) => {
                            return (
                                <div key={index}>
                                    <OptionsButtons onClick={() => handleDuration(duration)} isActive={activeDuration === duration ? true : false}>{duration}</OptionsButtons>
                                </div>
                            )
                        })
                    )
                }
                {
                    activeOption === "words" && (
                        wordAmount.map((amount, index) => {
                            return (
                                <div key={index}>
                                    <OptionsButtons onClick={() => handleWordAmount(amount)} isActive={acitveWordAmount === amount ? true : false}>{amount}</OptionsButtons>
                                </div>
                            )
                        })
                    )
                }
                <div>
                    <OptionsButtons onClick={() => {
                        if (activeOption === "time") return handleTimeCustomize()
                        else if (activeOption === "words") return handleWordsCustomize()
                    }}> <FaTools /> </OptionsButtons>
                </div>
            </div>
        </div>
    )
}

export default Navcomponent;
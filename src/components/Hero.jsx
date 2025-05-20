import React, { useEffect, useState, useRef } from "react";

export default function Heor() {
    const [words, setWords] = useState([]);
    const [inputs, setInputs] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [typedChars, setTypedChars] = useState([]);
    const containerRef = useRef(null);
    let wordQueue = [];

    let string = "Prefix a fill utility with a breakpoint variant like md to only apply the utility at medium screen sizes and above";


    useEffect(() => {
        setWords(string.split(" "));
        document.addEventListener("keydown", handleKeyPressed);
        return () => document.removeEventListener("keydown", handleKeyPressed);
    }, [typedChars, currentWordIndex]);



    function handleKeyPressed(event) {
        if (event.key === ' ') {

        } else if (event.key === "Backspace") {

        } else if (event.key.length === 1) {
            wordQueue.push(words[currentWordIndex]);
            setInputs(prev => prev + event.key);
            setTypedChars(prev => [...prev, event.key]);
        }
    }

    useEffect(() => {
        console.log(words[currentWordIndex]);
        console.log(typedChars, inputs, currentWordIndex, wordQueue);
    }, [typedChars, inputs, wordQueue])

    function checkTypedChars(ch, index) {
        if (!typedChars[index]) return;
        return typedChars[index] === ch ? "text-white" : "text-red-500";
    }

    return (
        <div className="relative flex gap-x-5 flex-wrap text-3xl gap-y-5 text-gray-400 h-[154px]" ref={containerRef}>
            {words.map((word, index) => {
                return (word !== " ") && (
                    <div key={index} className="word active flex gap-x-1 font-medium font-sans">
                        {Array.from(word).map((character, i) => {
                            return (
                                <span className={checkTypedChars(character, i)} key={i}>{character}</span>
                            )
                        })}
                    </div>
                )
            })}
            <div className="text-cursor rounded absolute h-[40px] w-[3px] animate-blink transition-all bg-amber-100"></div>
        </div>
    )
}


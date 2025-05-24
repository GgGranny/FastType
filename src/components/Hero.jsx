import React, { useEffect, useState, useRef } from "react";

export default function Heor() {
    const [words, setWords] = useState([]);
    const [inputs, setInputs] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [wordTyped, setWordTyped] = useState([]);
    const containerRef = useRef(null);

    let string = "Prefix a fill utility with a breakpoint variant like md to only apply the utility at medium screen sizes and above";


    useEffect(() => {
        setWords(string.split(" "));
        document.addEventListener("keydown", handleKeyPressed);
        return () => document.removeEventListener("keydown", handleKeyPressed);
    }, [currentWordIndex, inputs]);



    function handleKeyPressed(event) {
        if (event.key === ' ') {
            setWordTyped((prev) => [...prev, inputs]);
            if (inputs.trim() === words[currentWordIndex]) {
                setInputs("");
                setCurrentWordIndex(prev => prev + 1);
            } else if (wordTyped[currentWordIndex] === words[currentWordIndex]) {
                setInputs("");
                setCurrentWordIndex(prev => prev + 1);
            } else {
                setWordTyped((prev) => {
                    return prev.slice(0, -1);
                })
            }
            event.preventDefault();
            return;
        } else if (event.key === "Backspace") {
            setInputs((prev) => {
                let inputsArray = inputs.split('');
                let newInputs = inputsArray.slice(0, -1).join('');
                return newInputs;
            });
            setCurrentWordIndex(prev => prev <= 0 ? 0 : prev - 1);

        } else if (event.key.length === 1) {
            setInputs(prev => prev + event.key);
        }
    }

    useEffect(() => {
        console.log(inputs, currentWordIndex, wordTyped);
    }, [inputs, currentWordIndex, wordTyped])

    function checkTypedChars(wordIndex, ch, index) {
        if (wordIndex !== currentWordIndex) return;
        const typedChar = inputs[index];
        if (!typedChar) return '';

        return typedChar === ch
            ? "correct text-white"
            : "wrong text-red-500";
    }

    return (
        <div className="relative flex gap-x-5 flex-wrap text-3xl gap-y-5 text-gray-400 h-[154px]" ref={containerRef}>
            {words.map((word, index) => {
                return (word !== " ") && (
                    <div key={index} className={`word  flex gap-x-1 font-medium font-sans`}>
                        {Array.from(word).map((character, i) => {
                            return (
                                <span className={checkTypedChars(index, character, i)} key={i}>{character}</span>
                            )
                        })}
                    </div>
                )
            })}
            <div className="text-cursor rounded absolute h-[40px] w-[3px] animate-blink transition-all bg-amber-100"></div>
        </div>
    )
}


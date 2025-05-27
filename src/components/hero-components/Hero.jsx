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
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPressed);
        return () => document.removeEventListener("keydown", handleKeyPressed);
    }, [currentWordIndex, inputs]);

    function handleKeyPressed(event) {
        if (event.key === ' ') {
            if (inputs.length > 0) {
                setWordTyped((prev) => [...prev, inputs]);
                setInputs("");
                setCurrentWordIndex((prevWordIndex) => prevWordIndex + 1);
            }
            event.preventDefault();
        }

        else if (event.key === "Backspace") {
            if (inputs.length > 0) {
                setInputs(prev => prev.slice(0, -1));
                return;
            }
            if (currentWordIndex > 0 && wordTyped.length >= currentWordIndex) {
                const prevIndex = currentWordIndex - 1;
                const prevTypedWord = wordTyped[prevIndex];
                const correctWord = words[prevIndex];
                if (prevTypedWord !== correctWord) {
                    setWordTyped(prev => {
                        const updated = [...prev];
                        updated.splice(prevIndex, 1);
                        return updated;
                    });
                    setInputs(prevTypedWord);
                    setCurrentWordIndex(prev => prev - 1);
                }
            }
        }


        else if (event.key.length === 1) {
            setInputs((prevInputs) => prevInputs + event.key);
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

    function checkWordTyped(word, index) {
        if (wordTyped.length === 0) return;
        return word === wordTyped[index] ? "typed text-white" : "";
    }

    function getCursorPosition() {
        const wordElements = containerRef.current?.querySelectorAll(".word");
        if (!wordElements || !wordElements[currentWordIndex]) return { top: 0, left: 0 };

        const wordElement = wordElements[currentWordIndex];
        const spans = wordElement.querySelectorAll("span");

        if (!spans || inputs.length === 0 || inputs.length >= spans.length) {
            return {
                top: wordElement.offsetTop,
                left: wordElement.offsetLeft
            };
        }
        else {
            const charSpans = spans[inputs.length - 1]
            return {
                top: charSpans.offsetTop,
                left: charSpans.offsetLeft
            };
        }
    }

    const cursorStyle = getCursorPosition();
    return (
        <div className="relative flex gap-x-5 flex-wrap text-3xl gap-y-5 text-gray-400 h-[154px]" ref={containerRef}>
            {words.map((word, index) => {
                return (word !== " ") && (
                    <div key={index} className={`word  flex gap-x-1 font-medium font-sans ${checkWordTyped(word, index)}`}>
                        {Array.from(word).map((character, i) => {
                            return (
                                <span className={checkTypedChars(index, character, i)} key={i}>{character}</span>
                            )
                        })}
                    </div>
                )
            })}
            <div className=" text-cursor rounded absolute h-[40px] w-[3px] animate-blink transition-all bg-amber-100" style={{ top: cursorStyle.top, left: cursorStyle.left }}></div>
        </div>
    )
}


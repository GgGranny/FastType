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
        //simple spacebar logic
        if (event.key === ' ') {
            if (inputs.length > 0) {
                setWordTyped((prev) => [...prev, inputs]);
                setInputs("");
                setCurrentWordIndex((prevWordIndex) => prevWordIndex + 1);
            }
            event.preventDefault();
        }

        else if (event.key === "Backspace") {
            //fallback to previous character
            if (inputs.length > 0) {
                setInputs(prev => prev.slice(0, -1));
            }

            //fallback to previous words last character
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

            //removes the appeded child characters
            if (words[currentWordIndex] && inputs.length >= words[currentWordIndex].length) {
                const wordElements = containerRef.current?.querySelectorAll(".word");
                const selectedWord = wordElements[currentWordIndex];
                const appendedSpans = selectedWord.querySelectorAll("span.appendedChild");
                if (appendedSpans.length > 0) {
                    selectedWord.removeChild(appendedSpans[appendedSpans.length - 1]);
                }
            }
        }

        else if (event.key.length === 1) {
            setInputs((prevInputs) => prevInputs + event.key);
            //append chid character if length exceeds
            if (words[currentWordIndex] && inputs.length >= words[currentWordIndex].length) {
                if (!words[currentWordIndex]) return;
                const wordElements = containerRef.current?.querySelectorAll(".word");
                const selectedWord = wordElements[currentWordIndex];
                const newSpan = document.createElement("span");
                newSpan.classList.add("appendedChild");
                newSpan.textContent = event.key;
                selectedWord.appendChild(newSpan);
            }
        }
    }

    useEffect(() => {
        console.log(inputs, currentWordIndex, wordTyped);
    }, [inputs, currentWordIndex, wordTyped])

    function checkTypedChars(wordIndex, ch, index) {
        // Word already typed
        if (wordIndex < currentWordIndex) {
            const typedWord = wordTyped[wordIndex] || "";
            const typedChar = typedWord[index];
            if (!typedChar) return "text-gray-500"; // fallback to gray if missing
            return typedChar === ch ? "text-white" : "text-red-500";
        }

        // Current word
        if (wordIndex === currentWordIndex) {
            const typedChar = inputs[index];
            if (!typedChar) return "text-gray-400"; // default for untyped character
            return typedChar === ch ? "text-white" : "text-red-500";
        }
        // Not yet typed words
        return "text-gray-400";
    }

    function getCursorPosition() {
        const wordElements = containerRef.current?.querySelectorAll(".word");
        if (!wordElements || !wordElements[currentWordIndex]) return { top: 0, left: 0 };
        const wordElement = wordElements[currentWordIndex];
        const spans = wordElement.querySelectorAll("span");

        //cursor at the begining position
        if (inputs.length === 0) {
            return {
                top: wordElement.offsetTop,
                left: wordElement.offsetLeft
            };
        }

        //Cursor at the end position
        if (inputs.length >= spans.length) {
            const lastCharacter = spans[spans.length - 1]
            return {
                top: lastCharacter.offsetTop,
                left: lastCharacter.offsetLeft + lastCharacter.offsetWidth
            }
        }

        //cursor at during typing
        const charSpans = spans[inputs.length]
        return {
            top: charSpans.offsetTop,
            left: charSpans.offsetLeft
        };
    }

    const cursorStyle = getCursorPosition();

    return (
        <div className="relative flex gap-x-5 flex-wrap text-3xl gap-y-5 text-gray-400 h-[154px]" ref={containerRef}>
            {words.map((word, index) => {
                return (word !== " ") && (
                    <div key={index} className={`word flex gap-x-1 font-medium font-sans`}>
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


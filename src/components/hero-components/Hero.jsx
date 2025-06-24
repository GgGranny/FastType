import React, { useEffect, useState, useRef, useContext } from "react";
import { TestContext } from "../context/TestContextAPI";
import Navcomponent from "../gameOptions-components/Navcomponent";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const { time } = useContext(TestContext);
    const [timer, setTimer] = useState(time);
    const [words, setWords] = useState([]);
    const [inputs, setInputs] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [wordTyped, setWordTyped] = useState([]);
    const [isTyping, setIsTyping] = useState(true);
    const [typingHasStarted, setTypingHasStarted] = useState(false);
    const [worongWordNo, setWrongWordNo] = useState(0);
    const [errorNo, setErrorNo] = useState(2);
    const [wpmPerSecond, setWpmPerSecond] = useState([]);
    const containerRef = useRef(null);
    const timerRef = useRef(0);
    const inputRef = useRef("");
    const wordTypedRef = useRef([]);

    let navigate = useNavigate();

    let string = "Prefix a fill utility with a breakpoint variant like md to only apply the utility at medium screen sizes and above";

    useEffect(() => {
        setWords(string.split(" "));
        setInputs("");
        setCurrentWordIndex(0);
        setIsTyping(true);
        setWordTyped([]);
    }, []);

    useEffect(() => {
        setTimer(time);
        timerRef.current = time;
    }, [time]);

    useEffect(() => {
        wordTypedRef.current = wordTyped;
        inputRef.current = inputs;
    }, [wordTyped, inputs]);

    useEffect(() => {
        if (isTyping) {
            document.addEventListener("keydown", handleKeyPressed);
        } else {
            document.removeEventListener("keydown", handleKeyPressed);
        }
        return () => document.removeEventListener("keydown", handleKeyPressed);
    }, [currentWordIndex, inputs, worongWordNo, isTyping]);


    useEffect(() => {
        if (!isTyping || !typingHasStarted) return;
        let t = timerRef.current;
        const intervalId = setInterval(() => {
            setTimer((prev) => {
                const elapsed = time - prev + 1; // seconds elapsed
                const typedSoFar = wordTypedRef.current.length;
                const wpmNow = (typedSoFar / elapsed) * 60; // Words per minute at this second
                setWpmPerSecond(prev => [...prev, Math.round(wpmNow)]);
                if (prev === 1) {
                    setIsTyping(false);
                    navigateToResult(wordTypedRef.current, t, [...wpmPerSecond, Math.round(wpmNow)]);
                    return 1;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, [isTyping, typingHasStarted]);



    function handleKeyPressed(event) {
        setIsTyping(true);
        setTypingHasStarted(true);
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
                if (!wordElements) return;
                const selectedWord = wordElements[currentWordIndex];
                const newSpan = document.createElement("span");
                newSpan.classList.add("appendedChild");
                newSpan.textContent = event.key;
                selectedWord.appendChild(newSpan);
            }
        }
    }

    async function navigateToResult(currentWordTyped, t) {
        let newWordTypedArray = [...currentWordTyped];
        if (inputs.length > 0) newWordTypedArray.push(inputRef.current);

        try {
            const wordTypedLength = newWordTypedArray.length;
            const totalWPM = await calculateWPM(wordTypedLength, t);
            const acc = await calculateAccuracy(newWordTypedArray, words);
            const { extraCh, wrongCh, chs, missedCh } = await calculateCharacters(newWordTypedArray, words);

            // Simulate WPM progression over time — linear assumption
            let wpmList = [];
            for (let i = 1; i <= t; i++) {
                const partialWPM = await calculateWPM(Math.floor((wordTypedLength / t) * i), i);
                wpmList.push(parseFloat(partialWPM.toFixed(2)));
            }

            // Y-axis label is fixed
            let yAxis = Array.from({ length: words.length }, (_, i) => words.length - 1 - i);

            // X-axis = each second
            let xAxis = Array.from({ length: t }, (_, i) => i + 1);

            // Error count (dummy)
            let errNo = Array.from({ length: wrongCh }, (_, i) => i + 1);

            // Primary series = WPM per second
            let primarySeries = [...wpmList];

            navigate("/result", {
                state: {
                    yAxis,
                    xAxis,
                    errNo,
                    wpm: totalWPM,
                    acc,
                    extraCh,
                    wrongCh,
                    chs,
                    missedCh,
                    consistency: calculateConsistency(wpmList),
                    t,
                    primarySeries
                }
            });

        } catch (error) {
            console.error("error: " + error);
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

    async function calculateAccuracy(wordTyped, words) {
        return new Promise((resolve, reject) => {
            if (!wordTyped || wordTyped.length === 0) {
                reject("typed word is empty");
                return;
            }
            console.log("this iis accruracy 2");
            console.log(wordTyped);
            let correctWordsNo = 0;
            let typedWordsNo = wordTyped.length;
            for (let i = 0; i <= typedWordsNo - 1; i++) {
                if (words[i] === wordTyped[i]) {
                    correctWordsNo++;
                }
            }
            resolve(Math.floor((correctWordsNo / typedWordsNo) * 100));
        })
    }
    function calculateWPM(totalWordsTyped, timeInSeconds) {
        return new Promise((resolve) => {
            if (totalWordsTyped <= 0 || timeInSeconds <= 0) {
                resolve(0);
            } else {
                const timeInMinutes = timeInSeconds / 60;
                const wpm = totalWordsTyped / timeInMinutes;
                resolve(parseFloat(wpm.toFixed(2)));
            }
        });
    }


    async function calculateCharacters(wordTyped, words) {
        let chs = wordTyped.join(" ").length;
        let wrongCh = 0;
        let extraCh = 0;
        let missedCh = 0;

        for (let i = 0; i < wordTyped.length; i++) {
            const typedWord = wordTyped[i] || "";
            const actualWord = words[i] || "";

            const minLength = Math.min(typedWord.length, actualWord.length);

            // Count wrong characters in the common length
            for (let j = 0; j < minLength; j++) {
                if (typedWord[j] !== actualWord[j]) {
                    wrongCh++;
                }
            }

            // Count extra characters
            if (typedWord.length > actualWord.length) {
                extraCh += typedWord.length - actualWord.length;
            }

            // Count missed characters
            if (typedWord.length < actualWord.length) {
                missedCh += actualWord.length - typedWord.length;
            }
        }

        return {
            extraCh,
            wrongCh,
            chs,
            missedCh
        };
    }


    function calculateConsistency(wpmRecords) {
        if (wpmRecords.length <= 1) return 100;

        const n = wpmRecords.length;
        const avg = wpmRecords.reduce((a, b) => a + b, 0) / n;

        const variance = wpmRecords.reduce((sum, wpm) => {
            return sum + Math.pow(wpm - avg, 2);
        }, 0) / n;

        const stdDev = Math.sqrt(variance);

        const consistency = Math.max(0, Math.min(100, 100 - (stdDev / avg) * 100));
        return consistency.toFixed(2); // Returns value like 87.34
    }



    return (
        <div className="hero-container ">
            <div><Navcomponent /></div>
            <div>
                <div className="time-container h-10 w-full">
                    <div className={!isTyping ? "hidden" : "block"}><p>{timer}</p></div>
                </div>
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
            </div>
        </div>
    )
}






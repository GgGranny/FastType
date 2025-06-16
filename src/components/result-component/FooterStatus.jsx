import { useContext } from "react";
import { TestContext } from "../context/TestContextAPI";

function FooterStatus({ result }) {
    const { testType, time } = useContext(TestContext);
    return (
        <div className="flex justify-between">
            <div className="test-type-container">
                <div className="status-label"><p>test type</p></div>
                <div className="status"><p>{testType} {time} </p></div>
            </div>
            <div className="wrp-container">
                <div className="status-label"><p>wrp</p></div>
                <div className="status"><p>43</p></div>
            </div>
            <div className="characters-container">
                <div className="status-label"><p>characters</p></div>
                <div className="status"><p>{result.chs} / {result.extraCh}/ {result.wrongCh}/ {result.missedCh} </p></div>
            </div>
            <div className="consistency">
                <div className="status-label"><p>consistecy</p></div>
                <div className="status"><p>{result.consistency}</p></div>
            </div>
            <div className="time-count-container">
                <div className="status-label"><p>time</p></div>
                <div className="status"><p>{result.t < 60? `${result.t} seconds`: `${(result.t/60).toFixed(2)} mins`}</p></div>
            </div>
        </div>
    )
}

export default FooterStatus;
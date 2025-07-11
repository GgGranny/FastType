import React, { useState } from "react";
import Graph from "./Graph";
import FooterStatus from "./FooterStatus";
import { useLocation } from "react-router-dom";
import LineChart from "./LineChart";

function ResultPage() {
    let height = 200;
    const location = useLocation();
    const result = location.state;

    return (
        <div className="grid grid-cols-5 grid-rows-2">
            <div className="row-start-1 col-start-1 col-span-5">
                <div className="flex items-center">
                    <div className="stat-container flex-none">
                        <div>
                            <div className="status-label"><p>wpm</p></div>
                            <div className="status"><p>{result.wpm}</p></div>
                        </div>
                        <div>
                            <div className="status-label"><p>acc</p></div>
                            <div className="status">{result.acc}%</div>
                        </div>
                    </div>
                    <div className="graph-container flex-1">
                        <div>
                            <Graph yAxis={result.yAxis} xAxis={result.xAxis} primarySeries={result.primarySeries} secondarySeries={result.wrongWordsArray}
                                height={height} axisColor={"#2F4858"} tickColor={"#FFFFFF"}
                                labelColor={"gray"} area={true} errorNo={result.errNo} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row-start-2 col-start-1 col-span-5">
                <FooterStatus result={result} />
            </div>
        </div>
    )
}

export default ResultPage;
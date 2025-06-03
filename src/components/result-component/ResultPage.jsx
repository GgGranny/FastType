import React, { useState } from "react";
import Graph from "./Graph";

function ResultPage() {
    const xAxis = [1, 2, 3, 5, 8, 10];
    const series = [2, 2.5, 5, 6, 9, 10];
    let height = 200;
    return (
        <div>
            <div></div>
            <div>
                <div>
                    <Graph xAxis={xAxis} series={series} height={height} axisColor={"#FFFFFF"} tickColor={"#FFFFFF"} labelColor={"#FFFFFF"} area={false} />
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default ResultPage;
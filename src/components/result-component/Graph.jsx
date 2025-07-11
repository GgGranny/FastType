import { axisClasses } from "@mui/x-charts";
import { LineChart, LineElement } from "@mui/x-charts/LineChart";

function Graph({ yAxis, xAxis, height, axisColor, labelColor, area, errorNo, primarySeries, secondarySeries }) {
    return (
        <div>
            <LineChart
                xAxis={[{ scaleType: "point", data: [...xAxis] }]}
                yAxis={[
                    {
                        label: "words per min",
                        id: "left-axis",
                        scaleType: "linear",
                        data: [...yAxis],
                        position: "left",
                    },
                    {
                        label: "error",
                        id: "right-axis",
                        scaleType: "linear",
                        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                        position: "right",
                    },
                ]}
                series={[
                    {
                        id: "series-1",
                        yAxisId: "left-axis",
                        data: [...primarySeries],
                        label: "rwp",
                        color: "#DAF7DC"
                    },
                    {
                        id: "series-2",
                        yAxisId: "right-axis",
                        data: [...secondarySeries],
                        label: "error",
                    }
                ]}
                height={height}
                sx={() => ({
                    [`.${axisClasses.root}`]: {
                        [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                            stroke: axisColor,
                            strokeWidth: 2,
                        },
                        [`.${axisClasses.tickLabel}`]: {
                            fill: labelColor,
                        },
                        [`.${axisClasses.label}`]: {
                            fill: "gray",
                        },
                    },
                    [`& .MuiMarkElement-root`]: {
                        r: 1
                    },
                    ['& .MuiChartsGrid-line']: {
                        stroke: '#444', // 👈 Your custom grid color here
                        strokeWidth: 1,
                        shapeRendering: 'crispEdges',
                    },
                    [`& .MuiLineElement-series-series-2`]: {
                        strokeWidth: 0,
                    }
                })}
                grid={{ vertical: true, horizontal: true }}
                slotProps={{
                    legend: {
                        sx: {
                            color: labelColor,
                        },
                    },
                }}
            />
        </div>
    );
}

export default Graph;

import { axisClasses } from "@mui/x-charts";
import { LineChart } from "@mui/x-charts/LineChart"

function Graph({ yAxis, xAxis, series, height, axisColor, labelColor, area, errorNo }) {
    return (
        <div>
            <LineChart
                xAxis={[{ data: [...xAxis] }]}
                yAxis={[
                    { id: "left-axis", scaleType: "linear", data: [...yAxis], position: "left" },
                    { id: "right-axis", scaleType: "linear", data: [...errorNo], position: "right" }
                ]}
                series={[
                    { yAxisId: "left-axis", data: [...series], label: "rwp", color: "#DAF7DC" },
                    // { yAxisId: "right-axis", data: [1, 2, 3, 4, 5], label: "rwp", color: "#DAF7DC" },
                ]}
                height={height}
                sx={() => ({
                    [`.${axisClasses.root}`]: {
                        [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                            stroke: axisColor,
                            strokeWidth: 2,
                        },
                        [`.${axisClasses.tickLabel}`]: {
                            fill: labelColor
                        }
                    }
                })}
                grid={{ vertical: true, horizontal: true }}
                slotProps={{
                    legend: {
                        sx: {
                            color: "#FFFFFF"
                        }
                    }
                }}
            />
        </div>
    )
}

export default Graph;
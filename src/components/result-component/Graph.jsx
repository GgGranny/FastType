import { axisClasses } from "@mui/x-charts";
import { LineChart } from "@mui/x-charts/LineChart"

function Graph({ xAxis, series, height, axisColor, labelColor, area }) {
    return (
        <div>
            <LineChart
                xAxis={[{ data: [...xAxis] }]}
                series={[
                    { data: [...series], area, label: "rwp" },
                    { data: [2, 3, 4, 5, 6, 7], area, label: "raw" }
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
            />
        </div>
    )
}

export default Graph;
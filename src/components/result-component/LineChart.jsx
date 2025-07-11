import { ResponsiveLine } from "@nivo/line";

const LineChart = () => {
    const data = [
        {
            "id": "norway",
            "data": [
                {
                    "x": "plane",
                    "y": 0
                },
                {
                    "x": "helicopter",
                    "y": 20
                },
                {
                    "x": "boat",
                    "y": 30
                }
            ]
        }
    ]
    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 0, right: 0, bottom: 0, left: 60 }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            axisBottom={{ legend: 'transportation', legendOffset: 36 }}
            axisLeft={{ legend: 'count', legendOffset: -40 }}
            pointSize={2}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={3}
            pointBorderColor={{ from: 'background' }}
            pointLabelYOffset={-8}
            areaOpacity={0}
            enableTouchCrosshair={true}
            useMesh={true}
            defaultHeight={200}
            defaultWidth={200}
            enableGridX={false}
            enableGridY={false}
            legends={[
                {
                    anchor: 'top',
                    direction: 'column',
                    translateX: 100,
                    itemWidth: 80,
                    itemHeight: 22,
                    symbolShape: 'circle'
                }
            ]}
        />
    )
}

export default LineChart;
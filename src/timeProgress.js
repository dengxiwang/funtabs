import { Progress } from "antd";

const TimeProgress = () => {
    const timeProcessDiv = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '10px',
        height: '100%'
    }
    return (
        <div style={timeProcessDiv}>
            <Progress
                type="circle"
                percent={90}
                strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }}
            />
        </div>
    )
}

export default TimeProgress;
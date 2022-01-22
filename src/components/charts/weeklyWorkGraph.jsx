import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

const data = [
  {
    name: "Monday",
    "Total hours": 0,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Tuesday",
    "Total hours": 0,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Wednesday",
    "Total hours": 0,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Thursday",
    "Total hours": 0,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Friday",
    "Total hours": 0,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Saturday",
    "Total hours": 0,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Sunday",
    "Total hours": 0,
    pv: 4300,
    amt: 2100,
  },
];

export class WeeklyWorkGraph extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        graphData:data,
        updateFlag:false
    }
  }

  componentDidUpdate(){
     
    let graphData=this.state.graphData;
    data.map((item,dayNo)=>{
      const foundData = this.props.chartData.find((d) =>  moment(d.trackingDate).day()-1 === dayNo);
      if(foundData){
        graphData[dayNo]["Total hours"]=Number(foundData.trackingTime.totalHours)
      }
    })

    setTimeout(()=>{
      this.setState({graphData:graphData,updateFlag:true})
    },1000)

  }

  render() {
    const width = this.props.width || "100%";
    const height = this.props.height || 400;
    const {graphData,updateFlag}=this.state
    return (
      <ResponsiveContainer
        width={width}
        height={height}
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
      >
        
        <AreaChart
          data={graphData}
          margin={{
            top: 10,
            right: 0,
            left: -20,
            bottom: 0,
          }}
        >
          <XAxis dataKey={"name"} />
          <YAxis domain={[0, 24]} />
          <Tooltip
            active={true}
            filterNull={false}
            itemStyle={{ width: 100, display: "flex" }}
          />
          <Area
            type="monotone"
            dataKey={"Total hours"}
            stackId="1"
            stroke="#2386f5"
            fill="#77abe5"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

import { clearStorage } from "mapbox-gl";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import instance from "../../config/axios";
import { getMonthName } from "../../utils/ChartConversions";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Charts() {
  const [chartData, setChartData] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [monthVal, setMonthVal] = useState([]);

  //   const token = useSelector(selectC);
  useEffect(() => {
    try {
      const res = instance
        .get(
          "/property/propertyChart"
          //     {
          //     headers: {
          //     Authorization: `Bearer ${token}`,
          // }
          //     }
        )
        .then((data) => {
          console.log("data:", data.data.data);
          setChartData(data.data.data);
          let months = [];
          let values = [];
          data?.data?.data.map((month) => {
            console.log("month mapper", getMonthName(month._id));
            months.push(getMonthName(month._id));
            values.push(month.count);
            setMonthData(months);
            setMonthVal(values);
          });
        });
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
  }, []);
  console.log("month data", monthData);

  //recharts
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
    },
  ];

  return (
    // recharts
    <BarChart
      width={730}
      height={250}
      data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="pv"
        fill="#8884d8"
      />
      <Bar
        dataKey="uv"
        fill="#82ca9d"
      />
    </BarChart>
    // <Bar data={data} />
  );
}

export default Charts;

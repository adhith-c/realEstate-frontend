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
  const [newChart, setnewChart] = useState([]);
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
          //   console.log("data:", data.data.data);
          setChartData(data.data.data);
          let newChartData = [];
          data?.data?.data.map((month) => {
            // console.log("month:", month);
            newChartData.push({
              name: getMonthName(month._id),
              propertyCount: month.count,
            });
            setnewChart(newChartData);
          });
          //   let months = [];
          //   let values = [];
          //   data?.data?.data.map((month) => {
          //      console.log("month mapper", getMonthName(month._id));
          //     months.push(getMonthName(month._id));
          //     values.push(month.count);
          //     setMonthData(months);
          //     setMonthVal(values);
          //   });
        });
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
  }, []);

  return (
    // recharts
    <BarChart
      width={730}
      height={350}
      data={newChart}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {/* <Bar
        dataKey="pv"
        fill="#8884d8"
      /> */}
      <Bar
        dataKey="propertyCount"
        fill="#82ca9d"
      />
    </BarChart>
  );
}

export default Charts;

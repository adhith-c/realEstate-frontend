// import { clearStorage } from "mapbox-gl";
// import React, { useEffect, useState } from "react";
// import Chart from "react-apexcharts";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import instance from "../../config/axios";
// import { getMonthName } from "../../utils/ChartConversions";
// function Charts() {
//   const [chartData, setChartData] = useState([]);
//   const [monthData, setMonthData] = useState([]);
//   const [monthVal, setMonthVal] = useState([]);

//   //   const token = useSelector(selectC);
//   useEffect(() => {
//     try {
//       const res = instance
//         .get(
//           "/property/propertyChart"
//           //     {
//           //     headers: {
//           //     Authorization: `Bearer ${token}`,
//           // }
//           //     }
//         )
//         .then((data) => {
//           console.log("data:", data.data.data);
//           setChartData(data.data.data);
//           let months = [];
//           let values = [];
//           data?.data?.data.map((month) => {
//             console.log("month mapper", getMonthName(month._id));
//             months.push(getMonthName(month._id));
//             values.push(month.count);
//             setMonthData(months);
//             setMonthVal(values);
//           });
//         });
//     } catch (err) {
//       toast.error("Something went wrong.Please try again");
//     }
//   }, []);
//   console.log("month data", monthData);
//   let state = {
//     options: {
//       chart: {
//         id: "Property-Statistics",
//       },
//       xaxis: {
//         Month: [...monthData],
//       },
//     },
//     series: [
//       {
//         name: "properties",
//         data: [...monthVal],
//       },
//     ],
//   };

//   return (
//     <Chart
//       options={state.options}
//       //   options={monthData}
//       series={state.series}
//       type="bar"
//       width={500}
//       height={300}
//     />
//   );
// }

// export default Charts;

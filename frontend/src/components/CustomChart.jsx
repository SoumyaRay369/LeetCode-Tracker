// src/components/CustomChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export const CustomChart = ({ chartData, problemsList, rangeFormatting }) => {
  const data = chartData || [];
  let groupedData = [];

  if (data.length > 0) {
    if (rangeFormatting === "Month") {
      // Group by full date for the selected month
      groupedData = Object.entries(
        data.reduce((acc, entry) => {
          acc[entry.date] = (acc[entry.date] || 0) + 1;
          return acc;
        }, {})
      ).map(([key, count]) => ({ date: key, count }));
    } else if (rangeFormatting === "Year") {
      // Group by month/year label
      const selectedYear = data[0].date.split("/")[2];
      const countsByMonth = data.reduce((acc, entry) => {
        const [day, month, year] = entry.date.split("/");
        if (year === selectedYear) {
          const label = `${month}/${year}`;
          acc[label] = (acc[label] || 0) + 1;
        }
        return acc;
      }, {});
      groupedData = Array.from({ length: 12 }, (_, i) => {
        const monthNumber = (i + 1).toString().padStart(2, "0");
        const label = `${monthNumber}/${selectedYear}`;
        return {
          date: label,
          count: countsByMonth[label] || 0
        };
      });
    } else {
      // Day view: group by full date (only one date)
      groupedData = Object.entries(
        data.reduce((acc, entry) => {
          acc[entry.date] = (acc[entry.date] || 0) + 1;
          return acc;
        }, {})
      ).map(([key, count]) => ({ date: key, count }));
    }
  }

  // Filter the raw problemsList to show under the chart
  const filteredProblems = (() => {
    if (!problemsList || problemsList.length === 0) return [];

    if (rangeFormatting === "Month") {
      // All entries share that month
      return problemsList;
    } else if (rangeFormatting === "Year") {
      const selectedYear = problemsList[0].date.split("/")[2];
      return problemsList.filter(entry => entry.date.split("/")[2] === selectedYear);
    } else if (rangeFormatting === "Day") {
      const selectedDate = problemsList[0].date;
      return problemsList.filter(entry => entry.date === selectedDate);
    }
    return [];
  })();

  return (
    <>
      {rangeFormatting === "Month" && (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={groupedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#82ca9d"
                activeBar={<Rectangle fill="orange" stroke="green" />}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 max-h-64 overflow-y-auto">
            {filteredProblems.map((entry, idx) => (
              <div key={idx} className="p-2 border-b">
                {entry.problemStatement}
              </div>
            ))}
          </div>
        </>
      )}

      {rangeFormatting === "Year" && (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={groupedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#ffc658"
                activeBar={<Rectangle fill="red" stroke="black" />}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 max-h-64 overflow-y-auto">
            {filteredProblems.map((entry, idx) => (
              <div key={idx} className="p-2 border-b">
                {entry.problemStatement}
              </div>
            ))}
          </div>
        </>
      )}

      {rangeFormatting === "Day" && (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={groupedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 max-h-64 overflow-y-auto">
            {filteredProblems.map((entry, idx) => (
              <div key={idx} className="p-1 ">
                {entry.problemStatement}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
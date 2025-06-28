import React, { useState } from "react";
import { CustomChart } from "./CustomChart";

export const ListOfProblems = () => {
  const [rangeFormatting, setRangeFormatting] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [chartData, setChartData] = useState([]);
  const [problemsList, setProblemsList] = useState([]);

  const fetchData = () => {
    let route;
    if (rangeFormatting === "Day") {
      route = `/getListForDate?dateString=${inputValue}`;
    } else if (rangeFormatting === "Month") {
      route = `/getListForMonth?monthNumber=${inputValue}`;
    } else if (rangeFormatting === "Year") {
      route = `/getListForYear?year=${inputValue}`;
    } else {
      return;
    }

    fetch(`http://localhost:3000${route}`)
      .then((res) => res.json())
      .then((data) => {
        const formattedChartData = data.listOfProblems.map((entry) => ({
          date: entry.date,
          value: 1,
        }));
        setChartData(formattedChartData);
        setProblemsList(data.listOfProblems);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-4">
      {/* Buttons and input for Day/Month/Year */}
      <div className="flex flex-row gap-x-3 justify-center mb-3">
        <button onClick={() => setRangeFormatting("Day")} className="p-2 rounded-md bg-amber-300">Day</button>
        <button onClick={() => setRangeFormatting("Month")} className="p-2 rounded-md bg-amber-300">Month</button>
        <button onClick={() => setRangeFormatting("Year")} className="p-2 rounded-md bg-amber-300">Year</button>
      </div>



      {rangeFormatting && (
        <div className="flex flex-row gap-x-3 justify-center mb-3">
          <input
            type="text"
            placeholder={
              rangeFormatting === "Day"
                ? "dd/mm/yyyy"
                : rangeFormatting === "Month"
                  ? "Enter Month Number"
                  : "Enter Year"
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="p-2 rounded-md outline-none shadow-2xl"
          />
          <button onClick={fetchData} className="rounded-md p-2 bg-amber-300">Send</button>
        </div>
      )}

      {/* This is where the chart + list will render */}
      <CustomChart
        chartData={chartData}
        problemsList={problemsList}
        rangeFormatting={rangeFormatting}
      />
    </div>
  );
};
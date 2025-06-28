import { InputProblems } from "./components/InputProblems"
import { ListOfProblems } from "./components/ListOfProblems"
import { useEffect, useState } from "react"
import { CustomChart } from "./components/CustomChart"
function App() {

  const [chartData, setChartData] = useState([]);
  
  return (
    <>
      <div className="flex justify-center mt-2">
          My LeetCode Tracker
      </div>
      <InputProblems></InputProblems>
      <ListOfProblems setChartData={setChartData}></ListOfProblems>
      <CustomChart data={chartData} rangeFormatting="Month"></CustomChart>
    </>
  )
}

export default App

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";
import AdditionChart from "./AdditionChart";
import CommitChart from "./CommitChart";

export default function Chart({ fullname }) {
  const [chartDropdown, setchartDropdown] = useState("commitOptions");

  return (
    <>
      <select
        className="chartDropdown"
        name="chartDropdown"
        id="chartDropdown"
        onChange={(e) => setchartDropdown(e.target.value)}
      >
        <option value="commitOptions">Commits</option>
        <option value="additionsOptions">Additions</option>
        <option value="deletionsOptions">Deletions</option>
      </select>
      {chartDropdown === "commitOptions" && <CommitChart fullname={fullname} />}
      {(chartDropdown === "additionsOptions" ||
        chartDropdown === "deletionsOptions") && (
        <AdditionChart chartDropdown={chartDropdown} fullname={fullname} />
      )}
    </>
  );
}

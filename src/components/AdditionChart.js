import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";

export default function AdditionChart({ chartDropdown, fullname }) {
  const [changesData, setChangesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartComponentRef = useRef(null);

  const changesURL = `https://api.github.com/repos/${fullname}/stats/code_frequency`;

  useEffect(() => {
    fetchChangesData();
  }, []);

  const fetchChangesData = async () => {
    const response = await fetch(changesURL);
    const data = await response.json();
    setChangesData(data);
    setLoading(false);
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  const additionOptions = {
    title: {
      text: "Chart"
    },
    xAxis: {
      categories: changesData.map((item) => item[0])
    },
    series: [
      {
        data: changesData.map((item) => item[1]),
        name: "Additions"
      }
    ]
  };

  const deletionOptions = {
    title: {
      text: "Chart"
    },
    xAxis: {
      categories: changesData.map((item) => item[0])
    },
    series: [
      {
        data: changesData.map((item) => Math.abs(item[2])),
        name: "Deletions"
      }
    ]
  };

  return (
    <>
      {chartDropdown === "additionsOptions" && (
        <HighchartsReact
          ref={chartComponentRef}
          highcharts={Highcharts}
          options={additionOptions}
        />
      )}
      {chartDropdown === "deletionsOptions" && (
        <HighchartsReact
          ref={chartComponentRef}
          highcharts={Highcharts}
          options={deletionOptions}
        />
      )}
    </>
  );
}

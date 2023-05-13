import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";

export default function AdditionChart({ chartDropdown, fullname }) {
  const [changesData, setChangesData] = useState(null);
  const [err, setErr] = useState(false);
  const [emptyRecords, setEmptyRecords] = useState(false);
  const [additionOptions, setAdditionOptions] = useState(null);
  const [deletionOptions, setDeletionOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartComponentRef = useRef(null);

  const changesURL = `https://api.github.com/repos/${fullname}/stats/code_frequency`;

  useEffect(() => {
    fetchchangesData();
  }, [changesURL]);

  useEffect(() => {
    if (changesData !== null && Object.keys(changesData).length !== 0) {
      console.log(changesData);
      const addOptions = {
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

      const delOptions = {
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
      setAdditionOptions(addOptions);
      setDeletionOptions(delOptions);
    }
  }, [changesData]);

  const fetchchangesData = async () => {
    try {
      const response = await fetch(changesURL);
      const data = await response.json();
      response.status === 200 && setChangesData(data);
      response.status === 202 && setEmptyRecords(true);
      response.status !== 200 && response.status !== 202 && setErr(true);
      setLoading(false);
    } catch {
      setChangesData({});
      setLoading(false);
      setErr(true);
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (err) {
    return <p> Failed to fetch Data !</p>;
  }
  if (emptyRecords) {
    return <p>No Data Found!!</p>;
  }

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

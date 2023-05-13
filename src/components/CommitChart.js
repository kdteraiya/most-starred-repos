import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";

export default function CommitChart({ fullname }) {
  const [commitData, setCommitData] = useState({});
  const [err, setErr] = useState(false);
  const [emptyRecords, setEmptyRecords] = useState(false);
  const [commitOptions, setCommitOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartComponentRef = useRef(null);

  const commitURL = `https://api.github.com/repos/${fullname}/stats/commit_activity`;

  useEffect(() => {
    fetchCommitData();
  }, []);

  useEffect(() => {
    if (Object.keys(commitData).length !== 0 && commitData !== null) {
      const options = {
        title: {
          text: "Chart"
        },
        xAxis: {
          categories: commitData.map((item) => item.week)
        },
        series: [
          {
            data: commitData.map((item) => item.total),
            name: "changes"
          }
        ]
      };
      setCommitOptions(options);
    }
  }, [commitData]);

  const fetchCommitData = async () => {
    try {
      const response = await fetch(commitURL);
      const data = await response.json();
      response.status === 200 && setCommitData(data);
      response.status === 202 && setEmptyRecords(true);
      response.status !== 200 && response.status !== 202 && setErr(true);
      setLoading(false);
    } catch {
      setCommitData({});
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
      {commitOptions && (
        <HighchartsReact
          ref={chartComponentRef}
          highcharts={Highcharts}
          options={commitOptions}
        />
      )}
    </>
  );
}

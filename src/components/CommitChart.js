import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";

export default function CommitChart({ fullname }) {
  const [commitData, setCommitData] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartComponentRef = useRef(null);

  const commitURL = `https://api.github.com/repos/${fullname}/stats/commit_activity`;

  useEffect(() => {
    fetchCommitData();
  }, []);

  const fetchCommitData = async () => {
    const response = await fetch(commitURL);
    const data = await response.json();
    setCommitData(data);
    setLoading(false);
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  const commitOptions = {
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

  return (
    <>
      <HighchartsReact
        ref={chartComponentRef}
        highcharts={Highcharts}
        options={commitOptions}
      />
    </>
  );
}

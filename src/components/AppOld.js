import React, { useEffect, useState } from "react";
import "./styles.css";
import RepoRow from "./RepoRow";

export default function App() {
  const [repoInfo, setRepoInfo] = useState({});
  const [days, setDays] = useState("30");
  const [page, setPage] = useState(1);

  const urlTofetch = `https://api.github.com/search/repositories?q=created:>${
    days === "30" ? "2021-08-11" : days === "14" ? "2021-08-30" : "2021-09-06"
  }&sort=stars&order=desc`;

  useEffect(() => {
    console.log(urlTofetch);
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(urlTofetch);
    const dataJson = await response.json();
    setRepoInfo(dataJson);
  };

  return (
    <div className="App">
      <h1>Most starred Repos</h1>
      <select
        name="dropdown"
        id="dropdown"
        onChange={(e) => setDays(e.target.value)}
      >
        <option value="30">Last 30 Days</option>
        <option value="14">Last 14 Days</option>
        <option value="7">Last 7 Days</option>
      </select>
      {repoInfo?.items &&
        repoInfo?.items.map((item) => <RepoRow key={item.id} item={item} />)}
    </div>
  );
}

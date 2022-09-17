import React, { useState } from "react";
import "./styles.css";
import RepoRow from "./components/RepoRow";
import { useInView } from "react-intersection-observer";

import { useInfiniteQuery } from "@tanstack/react-query";

export default function App() {
  // const [repoInfo, setRepoInfo] = useState({});
  const [days, setDays] = useState("30");
  const { ref, inView } = useInView();

  const urlTofetch = `https://api.github.com/search/repositories?q=created:>${
    days === "30" ? "2021-08-11" : days === "14" ? "2021-08-30" : "2021-09-06"
  }&sort=stars&order=desc`;

  const fetchRepos = async ({ pageParam = 0 }) => {
    const res = await fetch(urlTofetch + "&page=" + pageParam);
    const data = await res.json();
    return { data, nextPage: pageParam + 1 };
  };

  const {
    data,
    error,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery(["repos"], fetchRepos, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    }
  });

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  React.useEffect(() => {
    refetch();
  }, [urlTofetch, refetch]);

  // if (isFetching) {
  //   return <p> Loading... </p>;
  // }
  return (
    <div className="App">
      <div className="header">
        <h1>Most Starred Repos</h1>
        <select
          className="repoDropdown"
          name="repoDropdown"
          id="repoDropdown"
          onChange={(e) => setDays(e.target.value)}
        >
          <option value="30">Last 30 Days</option>
          <option value="14">Last 14 Days</option>
          <option value="7">Last 7 Days</option>
        </select>
      </div>
      {data?.pages.map((page) => {
        return (
          <React.Fragment key={page.nextPage}>
            {page?.data?.items &&
              page?.data?.items.map((item) => (
                <RepoRow key={item.id} item={item} />
              ))}
          </React.Fragment>
        );
      })}

      <p ref={ref}>Loading...</p>
    </div>
  );
}

import { useState } from "react";
import Chart from "./Chart";
import Chevron from "./Chevron";

export default function RepoRow({ item }) {
  const [showChart, setShowChart] = useState(false);

  return (
    <>
      <div className="row">
        {item?.owner?.avatar_url && (
          <div className="col avtarContainer">
            <img src={item?.owner?.avatar_url} alt="avtar" />
          </div>
        )}
        <div className="col infoContainer">
          <h3>{item?.name}</h3>
          <h5>{item?.description}</h5>
          <h6>Stars: {item?.stargazers_count}</h6>
          <h6>Issues: {item?.open_issues_count}</h6>
        </div>
        <div className="col btnContainer">
          <button onClick={() => setShowChart((prevState) => !prevState)}>
            <Chevron showChart={showChart} />
          </button>
        </div>
      </div>
      {showChart && <Chart fullname={item.full_name} />}
    </>
  );
}

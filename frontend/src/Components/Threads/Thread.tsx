import React from "react";
import { Link } from "react-router-dom";

import "../../Styles/Thread.scss";

export default function Thread(filteredThreads: any, { thread }: { thread: any }) {
  const threadId = thread.id;

  return (
    <div className="box">
      <Link className="linkButton" to={`/viewThread/${threadId}`}>
        <div>
          <h2>{thread.title}</h2>
        </div>
        <div>{thread.text}</div>
        <div></div>
      {thread.creationDate}
      </Link>
    </div>

  );
}

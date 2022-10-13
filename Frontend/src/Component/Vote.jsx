import { useState, useEffect } from "react";
import snoowrap from "snoowrap";
import "bootstrap/dist/css/bootstrap.min.css";
const Vote = (props) => {
  const postData = props.postId;
  const voteData = props.voteCount;
  const snooWrapAuth = props.snooWrapAuth;

  const reddit = new snoowrap(snooWrapAuth);

  const [voteCount, setvoteCount] = useState(voteData);

  const upVote = async (redditdata, postid) => {
    if (Math.abs(voteData - voteCount) === 0 || voteData - voteCount === 1) {
      const response = await redditdata.getSubmission(`t3_${postid}`).upvote();
      setvoteCount(voteCount + 1);
    }
  };

  const downVote = async (redditdata, postid) => {
    if (Math.abs(voteData - voteCount) === 0 || voteData - voteCount === -1) {
      const response = await redditdata.getSubmission(`${postid}`).downvote();
      setvoteCount(voteCount - 1);
    }
  };
  useEffect(() => {}, [voteCount]);
  return (
    <div>
      <p>
        <small>Vote {voteCount}</small>
      </p>
      <button
        type="button"
        class="button"
        onClick={() => upVote(reddit, postData)}
      >
     UpVote
      </button>{" "}
      <button
        type="button"
        class="button"
        onClick={() => downVote(reddit, postData)}
      >
        DownVote
      </button>{" "}
    </div>
  );
};

export default Vote;

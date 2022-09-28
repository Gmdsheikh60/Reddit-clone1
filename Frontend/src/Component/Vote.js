import { useEffect } from "react";
// import useFetch from "./useFetch";
import snoowrap from "snoowrap";
const Vote = (props) => {
  console.log(`props ${props.postId}`);
  const postData = props.postId;

  const reddit = new snoowrap({
    client_id: `qwnrWzLI75jlYuAVN2ptcg`,
    client_secret: `HDTnQjO10YwPRKr0epzP0BJj92dyEQ`,
    refresh_token: `2012867259867-g6EEKt7u6_-X0G9JCBqjpxr0sYSbzw`,
    username: `Few-Zucchini993`,
    user_agent: `testscript by u/Few-Zucchini993`,
  });

  const upVote = async (redditdata, postid) => {
    console.log(postid);
    const response = await redditdata.getSubmission(`t3_${postid}`).upvote();
  };
  const downVote = async (redditdata, postid) => {
    const response = await redditdata.getSubmission(`${postid}`).downvote();
  };

  return (
    <div>
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

import { useState, useEffect } from "react";
// import useFetch from "./useFetch";
import snoowrap from "snoowrap";
const Comments = (props) => {
  const postData = props.postId;
  const [comments, setcomments] = useState(null);
  const reddit = new snoowrap({
    client_id: `qwnrWzLI75jlYuAVN2ptcg`,
    client_secret: `HDTnQjO10YwPRKr0epzP0BJj92dyEQ`,
    refresh_token: `2012867259867-bxdME-1ZhbUvJvzTgyrjp9myoVoyew`,
    username: `Few-Zucchini993`,
    user_agent: `testscript by u/Few-Zucchini993`,
  });

  const postComments = async (redditdata, commentsdata, postID) => {
    const response = await redditdata
      .getSubmission(`${postID}`)
      .reply(`${commentsdata}`);
    return response;
  };

  const handleSubmit = async (e) => {
    e.target.disabled = true;
    e.preventDefault();
    const comment = await postComments(reddit, e.target[0].value, postData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-2">
        <div className="col-md">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInputGrid"
              placeholder="Comment"
              value={comments}
            />
            <label for="floatingInputGrid">Comment</label>
          </div>
        </div>
      </div>
      <button type="submit" className="button">
        Comment
      </button>
    </form>
  );
};

export default Comments;

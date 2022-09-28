import { useState, useEffect } from "react";
import snoowrap from "snoowrap";
const CommentText = (props) => {
  const postData = props.postId;
  console.log(postData);
  const [comments, setcomments] = useState("");

  const reddit = new snoowrap({
    client_id: `qwnrWzLI75jlYuAVN2ptcg`,
    client_secret: `HDTnQjO10YwPRKr0epzP0BJj92dyEQ`,
    refresh_token: `2012867259867-8GHXbA6U0ik6DGLsZzm19VnlfkN7Nw`,
    username: `Few-Zucchini993`,
    user_agent: `testscript by u/Few-Zucchini993`,
  });

  const [commentsObj, setCommentsObj] = useState("");

  const readComment = async () => {
    try {
      const result = await reddit.getSubmission(postData).comments;
      const topTenComments = result.slice(0, 10);
      const commentList = await topTenComments.map((comment) => {
        return (
          <li className="list-group-item">
            <strong>{comment.author.name}</strong>
            {`: ${comment.body}`}
          </li>
        );
      });
      if (commentList.length === 0) {
        const noComments = <p>No Comments</p>;
        setCommentsObj(noComments);
      } else {
        setCommentsObj(commentList);
      }
      console.log(`comments ${commentsObj}`);
    } catch (error) {
      console.log(error);
      const commentList = <p>No Comments</p>;
      setCommentsObj(commentList);
    }
  };
  useEffect(() => {
    readComment();
  }, []);

  const data = null;
  if (commentsObj === null) {
    return (
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }

  return <ul className="list-group list-group-flush">{commentsObj}</ul>;
};
export default CommentText;

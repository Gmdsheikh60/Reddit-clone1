import { useState, useEffect } from "react";
import snoowrap from "snoowrap";
const Comments = (props) => {
  const postData = props.postId;
  const [comments, setcomments] = useState(null);
  const [loading, setLoading] = useState(true);

  const snooWrapAuth = props.snooWrapAuth;

  const reddit = new snoowrap(snooWrapAuth);

  const postComments = async (redditdata, commentsdata, postID) => {
    const response = await redditdata
      .getSubmission(`${postID}`)
      .reply(`${commentsdata}`);
    return response;
  };

  const [newComment, setNewComment] = useState("");
  const [commentsObj, setCommentsObj] = useState("");

  const readComment = async () => {
    try {
      const result = await reddit.getSubmission(postData).comments;
      const topTenComments = result.slice(0, 10).reverse();
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      const commentList = <p>No Comments</p>;
      setCommentsObj(commentList);
      setLoading(false);
    }
  };

  useEffect(() => {
    readComment();
  }, [newComment]);

  const handleSubmit = async (e) => {
    e.target.disabled = true;
    e.preventDefault();
    setLoading(true);
    try {
      const comment = await postComments(reddit, e.target[0].value, postData);
      setNewComment(comment);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const data = null;
  if (loading) {
    return (
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container">
      <div>
        <ul className="list-group list-group-flush">{commentsObj}</ul>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="row">    
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="floatingInputGrid"
                placeholder="Comment"
                value={comments}
                style={{height: "2.5em"}}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="button">
                Comment
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Comments;

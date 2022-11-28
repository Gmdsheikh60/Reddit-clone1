import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import PostCards from "../Layout/Postcards";
const Subreddit = (props) => {
  const params = useParams();

  const endpointUrl = params.subredditId
    ? `https://oauth.reddit.com/r/${params.subredditId}`
    : "https://oauth.reddit.com/r/";

  const options = {
    method: "GET",
    headers: props.headerParameters,
  };
  const optionsStr = JSON.stringify(options);
  const { data, responseStatus } = useFetch(endpointUrl, optionsStr);
  if (data === null) {
    return (
      <div
        className="d-flex justify-content-center"
        style={{
          paddingTop: "25%",
        }}
      >
        <div className="spinner-border" style={{width: "5rem", height: "5rem"}} role="status">
          <div className="visually-hidden ">Loading...</div>
        </div>
      </div>
    );
  }
  if (!(responseStatus === 200 || responseStatus === 0)) {
    return (
      <div
        className="d-flex justify-content-center"
        style={{
          paddingTop: "25%",
        }}
      >
        {" "}
        <p>
          Something went wrong, please update the access token and try again!
        </p>
      </div>
    );
  } else {
    const tempResponse = data;
    var postsFound = false;
    const redditPosts = tempResponse.data.children.slice(0, 10).map((post) => {
      if (post.data.title.includes(props.query)) {
        postsFound = true;
        return (
          <div>
            <PostCards
              postData={post}
              snooWrapAuth={props.snooWrapAuth}
              searchData={props.query}
            />
          </div>
        );
      }
    });

    if (postsFound) {
      return <div>{redditPosts}</div>;
    }

    return (
      <div
        className="d-flex justify-content-center"
        style={{
          paddingTop: "25%",
        }}
      >
        {" "}
        <p>Sorry no posts found</p>
      </div>
    );
  }
};

export default Subreddit;

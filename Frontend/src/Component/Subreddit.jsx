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
        class="d-flex justify-content-center"
        style={{
          paddingTop: "25%",
        }}
      >
        <div class="spinner-border" role="status">
          <div class="visually-hidden ">Loading...</div>
        </div>
      </div>
    );
  }
  if (!(responseStatus === 200 || responseStatus === 0)) {
    return <h1>Error</h1>;
  } else {
    const tempResponse = data;
    function htmlDecode(input) {
      var doc = new DOMParser().parseFromString(input, "text/html");
      return doc.documentElement.textContent;
    }
    const redditPosts = tempResponse.data.children.slice(0, 10).map((post) => {
      return (
        <div>
          <PostCards
            postData={post}
            snooWrapAuth={props.snooWrapAuth}
            searchData={props.query}
          />
        </div>
      );
    });

    return <div>{redditPosts}</div>;
  }
};
export default Subreddit;

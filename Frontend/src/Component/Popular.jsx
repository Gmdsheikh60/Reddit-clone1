import "bootstrap/dist/css/bootstrap.min.css";
import useFetch from "../Hooks/useFetch";
import PostCards from "../Layout/Postcards";

const Popular = (props) => {
  const endpointUrl = "https://oauth.reddit.com/best";

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
export default Popular;

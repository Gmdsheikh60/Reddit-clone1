import "bootstrap/dist/css/bootstrap.min.css";
import { useState,createContext, useEffect, useContext } from "react";
import Vote from "./Vote";
import useFetch from "./useFetch";
import Comments from "./Comments";
import CommentText from "./CommentText";


const Home = (props) => {
  const endpointUrl = "https://oauth.reddit.com/new";

  const headerParameters = {
    UserAgent: "testscript by u/Few-Zucchini993    ",
    authorization: `Bearer 2012867259867-mm_LyflpzSfeeYvV_hz_clFrcn-_LA`,
    contentType: "application/json",
  };

  const options = {
    method: "GET",
    headers: headerParameters,
  };
  const optionsStr = JSON.stringify(options);
  const { data, responseStatus } = useFetch(endpointUrl, optionsStr);
  useEffect(() => {}, [data]);
  if (data === null) 
  {
    return (
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  } else {
    if (responseStatus !== 200) {
      return <h1>Error</h1>;
    }
    
    const tempResponse = data;
    function htmlDecode(input) {
      var doc = new DOMParser().parseFromString(input, "text/html");
      return doc.documentElement.textContent;
    }

    const redditPosts = tempResponse.data.children.slice(0, 10).map((post) => {
      const imgExists = post.data.preview != null;
      const imgUrl = imgExists
        ? encodeURI(post.data.preview.images[0].source.url)
        : "";
     
      if(post.data.title.includes(props.query))
      {
      return (
        <div
          className="container"
          style={{
            paddingLeft: "20vw",
            paddingRight: "20vw",
            paddingTop: "30px",
          }}
        >
          <div className="card" key={post.data.id}>
            <div className="card-header">{post.data.subreddit}</div>
            <div className="card-body">
              <h5 className="card-title">{post.data.title}</h5>
              {imgExists && (
                <img height="65%" width="70%" src={htmlDecode(imgUrl)} />
              )}
              <p className="card-text">{post.data.selftext}</p>
              <p>
                <small>Votes {post.data.ups}</small>
              </p>
              <Vote postId={post.data.id} />
            </div>
            <div className="accordion" id={`accordionExample${post.data.id}`}>
              <div className="accordion-item">
                <h2 className="accordion-header" id={`heading${post.data.id}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${post.data.id}`}
                    aria-expanded="true"
                    aria-controls={`collapse${post.data.id}`}
                  >
                    Comments
                  </button>
                </h2>
                <div
                  id={`collapse${post.data.id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <CommentText postId={post.data.id} />
                    <Comments postId={post.data.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
              }
    });

    return <div>{redditPosts}</div>;
  }
};

export default Home;

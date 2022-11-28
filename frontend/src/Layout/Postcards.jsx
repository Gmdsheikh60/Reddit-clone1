import 'bootstrap/dist/css/bootstrap.min.css';
import Vote from '../Component/Vote';
import Comments from '../Component/Comments';

function PostCards(props) {
  const { snooWrapAuth } = props;

  const post = props.postData;

  // const postDetails = data;
  function htmlDecode(input) {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
  }
  const imgExists = post.data.preview != null;
  const imgUrl = imgExists
    ? encodeURI(post.data.preview.images[0].source.url)
    : '';

  if (post.data.title.includes(props.searchData)) {
    return (
      <div
        className="container"
        style={{
          paddingLeft: '10em',
          paddingRight: '10em',
          paddingTop: '30px',
        }}
      >
        <div className="card" key={post.data.id}>
          <div className="card-header">{post.data.subreddit}</div>
          <div className="card-body">
            <h5 className="card-title">{post.data.title}</h5>
            {imgExists && (
              <img
                height="65%"
                width="70%"
                src={htmlDecode(imgUrl)}
                alt="img"
              />
            )}
            <p className="card-text">{post.data.selftext}</p>
            <Vote
              postId={post.data.id}
              voteCount={post.data.score}
              snooWrapAuth={props.snooWrapAuth}
            />
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
                  <Comments postId={post.data.id} snooWrapAuth={snooWrapAuth} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div />;
}

export default PostCards;

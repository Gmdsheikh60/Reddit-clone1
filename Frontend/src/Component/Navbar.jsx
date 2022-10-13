import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../logo.png";
import snoowrap from "snoowrap";
import { useEffect, useState } from "react";
const Navbar = (params) => {
  const reddit = new snoowrap({
    client_id: `qwnrWzLI75jlYuAVN2ptcg`,
    client_secret: `HDTnQjO10YwPRKr0epzP0BJj92dyEQ`,
    refresh_token: `2012867259867-aCDleLPXXAO6kvea6l-8Zoz8Wy1bgQ`,
    username: `Few-Zucchini993`,
    user_agent: `testscript by u/Few-Zucchini993`,
  });

  const [TempSubData, getTempSubData] = useState([]);
  useEffect(() => {
    const GetSubreddit = async () => {
      const response = await reddit.getSubscriptions();
      getTempSubData(response);
    };
    GetSubreddit();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    params.Filtervalue(e.target[0].value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light og-light">
      <a className="navbar-brand" href="/">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        Reddit Demo
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="Popular">
              Popular
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="All">
              All
            </a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="Subreddit"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Subreddit
            </a>

            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              {TempSubData.map((SubredditName) => (
                <li>
                  <a
                    class="dropdown-item"
                    href={`${SubredditName.display_name}`}
                    key={SubredditName}
                  >
                    {SubredditName.display_name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <div></div>
      <div>
        <form className="d-flex" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search the post title"
            aria-label="Search"
          />
          <button
            type="submit"
            className="btn btn-outline-light"
            style={{ paddingLeft: "10px" }}
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;

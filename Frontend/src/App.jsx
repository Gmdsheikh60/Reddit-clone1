import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import Popular from './Component/Popular';
import All from './Component/All';
import Vote from './Component/Vote';
import Comments from './Component/Comments';
import Subreddit from './Component/Subreddit';
import Postcards from './Layout/Postcards';

function App() {
  const [value, setValue] = useState('');
  const Filter = async (data) => {
    setValue(data);
  };
  const headerParameters = {
    UserAgent: '',
    authorization: 'Bearer ',
    contentType: 'application/json',
  };
  const snooWrapAuth = {
    client_id: '',
    client_secret: '',
    refresh_token: '',
    username: '',
    user_agent: 'testscript by u/',
  };

  return (
    <>
      <Navbar Filtervalue={Filter} FilterParam={value} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                query={value}
                headerParameters={headerParameters}
                snooWrapAuth={snooWrapAuth}
              />
            }
          />
          <Route
            path="Navbar:subredditId"
            element={<Navbar snooWrapAuth={snooWrapAuth} />}
          />
          <Route
            path="Popular"
            element={
              <Popular
                query={value}
                headerParameters={headerParameters}
                snooWrapAuth={snooWrapAuth}
              />
            }
          />
          <Route
            path="All"
            element={
              <All
                query={value}
                headerParameters={headerParameters}
                snooWrapAuth={snooWrapAuth}
              />
            }
          />
          <Route path="UpVote" element={<Vote />} />
          <Route path="Comments" element={<Comments />} />
          <Route path="Postcards" element={<Postcards snooWrapAuth={snooWrapAuth} />} />

          <Route
            path=":subredditId"
            element={
              <Subreddit
                query={value}
                headerParameters={headerParameters}
                snooWrapAuth={snooWrapAuth}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

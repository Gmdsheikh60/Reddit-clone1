import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import Popular from "./Component/Popular";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import All from "./Component/All";
import Vote from "./Component/Vote";
import Comments from "./Component/Comments";
import DownVote from "./Component/Comments";
import Subreddit from "./Component/Subreddit";
import { useState } from "react";


function App() {
  const[value,setValue]=useState('');
  // const Filter = async (data) => {
  //   setValue(data);
  // }
  const Filter = async (data) => {
    setValue(data);
  }
  

  return (
    <>
      <Navbar  Filtervalue={Filter} FilterParam={value}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home query={value}/>} />
          <Route path="Navbar:subredditId" element={<Navbar />} />
          <Route path="Popular" element={<Popular query={value} />} />
          <Route path="All" element={<All query={value} />} />
          <Route path="UpVote" element={<Vote />} />
          <Route path="Comments" element={<Comments />} />
          <Route path="Subreddit/:subredditId" element={<Subreddit query={value} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

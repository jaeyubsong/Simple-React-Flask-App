import React, { useState, useEffect } from 'react';
//import logo from '../../assets/images/logo.svg';
import './App.css';
import axios from 'axios'

import SearchPage from '../search/SearchPage'


//const BASE_URI = 'http://localhost:5000'



function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({ hits: [] });


  const fetchData = async () => {
    console.log("fetchData is called");
    const result = await axios({
      method: 'post',
      url: 'http://localhost:5000/vbs/getData',
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
    console.log(result)

  }



  return (
    <div className="App">
      <p>You clicked me {count} times</p>
      <button onClick={() => {
        console.log("Increase count");
        setCount(count + 1);
        setData({ hits: [count] });
      }}>
        click to increase count
      </button>
      <button onClick={() => {
        console.log("Call fetchData");
        fetchData();
      }}>
        Reload database
      </button>
      <br />
      <br />
      <form action="http://localhost:5000/vbs/upload" method="POST" encType="multipart/form-data">
        <input type="file" name="toUpload" />
        <input type="submit" value="Upload" />
      </form>

      <form action="http://localhost:5000/vbs/new" method='POST'>
        <label>Name and Description to Add:</label>
        <input type="text" name="name" />
        <input type="text" name="description" />
        <input type="submit" value="Save" />
      </form>

      <form action="http://localhost:5000/vbs/delete" method='POST'>
        <label>Name to remove:</label>
        <input type="text" name="name" />
        <input type="submit" value="Delete" />
      </form>

      <form action="http://localhost:5000/vbs/dssss" method='POST'>
        <label>Search:</label>
        <input type="text" name="name" />
        <input type="text" name="name" />
        <input type="text" name="name" />
        <input type="submit" value="Delete" />
      </form>
      <SearchPage />
      asdsa
    </div>

  );
};

export default App;

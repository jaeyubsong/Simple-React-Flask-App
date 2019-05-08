import React, { useState, useEffect} from 'react';
import logo from '../../assets/images/logo.svg';
import './App.css';
import axios from 'axios'

const BASE_URI = 'http://localhost:5000'


function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({ hits: []});
  const fetchData = async () => {
    console.log("fetchData is called");
    const result = await axios({
      method: 'post',
      url: 'http://localhost:5000/getData',
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
    console.log("Data is set is called");
    console.log("Result is " + result.data)
    setData(result.data);
    console.log("Finished setting data");
  }

  useEffect(() => {
    console.log("useEffect is called");
    console.log("Call fetch data");
    fetchData();
  }, [])

  return (
    <div className="App">
      <p>You clicked me {count} times</p>
      <button onClick={() => {
        console.log("Increase count");
        setCount(count + 1);
      }}>
        click to increase count
      </button>

      <button onClick={() => {
        console.log("Call fetchData");
        fetchData();
      }}>
        Reload database
      </button>
      
      <ul>
        {console.log("Making unordered list")}        
        {data.hits.map(item => (
          <li key={item.name}>
          {console.log("Item")}
          <h3>{item.name}</h3> 
          {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

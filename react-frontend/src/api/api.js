import axios from 'axios'

export const fetchData = async () => {
  console.log("fetchData is called");
  const result = await axios({
    method: 'post',
    url: 'http://localhost:5000/vbs/getData',
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  });

}
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

export const sendQuery = async (myData) => {
   console.log("QueryData is called sending ");
   console.log(myData)
   const result = await axios({
     method: 'post',
     url: 'http://localhost:5000/vbs/query',
     headers: {
       "Access-Control-Allow-Origin": "*"
     },
     data: {myData}
   });
   console.log("Got result back")
   console.log(result);
   return result;
 }
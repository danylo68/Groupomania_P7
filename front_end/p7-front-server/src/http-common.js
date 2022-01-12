import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api",

  headers: {
    // "Content- Type": 'application / x - www - form - urlencoded',
    "Content-type": "application/json",


    "Access-Control-Allow-Origin": "*",
    // 'X-Requested-With': 'XMLHttpRequest',
    // "Access-Control-Allow-Credentials": "true",
    // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"

  }
});
import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.1.26:3000/api",


  // headers: {
  'Content-Type': 'application/json;charset=UTF-8',
  //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',

  // }
});
import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/api",
    // withCredentials: false,
    headers: {
        'Content-type': 'application/json',
        // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        // 'Access-Control-Allow-Origin': 'Origin',
        // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        // 'Access-Control-Allow-Credentials': 'true'
    },



});



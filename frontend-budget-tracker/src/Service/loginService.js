import axios from "axios";
import {base} from "./utils";

const headers = {
    headers: {
    'Content-Type': 'application/json',
  }
}

export const loginUser = async(data)=>{
    return await axios.post(`${base}/login`,data,headers);
}
export const registerUser = async(data)=>{
    return await axios.post(`${base}/register`,data,headers);
}
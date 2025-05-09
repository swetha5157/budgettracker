import axios from "axios";
import {base} from "./utils";

const headers = {
    headers: {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  }
}

export const addCategories = async(data)=>{
    return axios.post(`${base}/api/categories`,data,headers);
}
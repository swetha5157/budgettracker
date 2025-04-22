import axios from "axios";
import {base} from "./utils";

const headers = {
    headers: {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  }
}
export const analysis = async(month,year)=>{
    return await axios.get(`${base}/api/ai?month=${month}&year=${year}`,headers);
}
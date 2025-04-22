import axios from "axios";
import {base} from "./utils";

const Header = {
   " Content-Type" : "application/json"
};

export const addCategories = async(data)=>{
    return axios.post(`${base}/api/categories`,data,Header);
}
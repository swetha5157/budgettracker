import axios from "axios";
import {base} from "./utils";

const Header = {
   " Content-Type" : "application/json"
};

export const getCategory = async (token)=>{
    console.log(base);
    return await axios.get(`${base}/api/categories/${token}`,Header);
}

export const createTransaction = async (formData)=>{
    return await axios.post(`${base}/api/transactions`, formData, Header);
}

export const getAllTransaction = async (id)=>{
   return await axios.get(`${base}/api/transactions/${id}`,Header);
}

export const updateTransaction = async (id,data) =>{
    return await axios.put(`${base}/api/transactions/${id}`,data,Header);
}
import axios from "axios";
import {base} from "./utils";


const headers = {
    headers: {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  }
}

export const getCategory = async ()=>{
    console.log(base);
    return await axios.get(`${base}/api/categories`,headers);
}

export const createTransaction = async (formData)=>{
    return await axios.post(`${base}/api/transactions`, formData, headers);
}

export const getAllTransaction = async ()=>{
   return await axios.get(`${base}/api/transactions/`,headers);
}

export const updateTransaction = async (id,data) =>{
    return await axios.put(`${base}/api/transactions/${id}`,data,headers);
}

export const deleteTransaction = async (id) =>{
    return await axios.delete(`${base}/api/transactions/${id}`,headers);
}
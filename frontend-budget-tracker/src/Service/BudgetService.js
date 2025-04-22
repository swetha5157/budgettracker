import axios from "axios";
import {base} from "./utils";

const headers = {
    headers: {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  }
}

export const getAllBudget =async()=>{
    return await axios.get(`${base}/api/budget`,headers);
}

export const getMonthlyBudget = async() =>{
    return await axios.get(`${base}/api/budget/monthly`,headers);
}

export const addBudget = async(data) =>{
    return await axios.post(`${base}/api/budget`,data,headers);
}

export const getBudgetById = async(id)=>{
    return await axios.get(`${base}/api/budget/get/${id}`,headers);
}

export const updateBudgetById = (id, updatedData) => {
    return axios.put(`${base}/api/budget/${id}`, updatedData,headers);
  };
  
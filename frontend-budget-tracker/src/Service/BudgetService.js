import axios from "axios";
import {base} from "./utils";

const Header = {
   " Content-Type" : "application/json"
};


export const getAllBudget =async(token)=>{
    return await axios.get(`${base}/api/budget/${token}`,Header);
}

export const getMonthlyBudget = async(token) =>{
    return await axios.get(`${base}/api/budget/monthly/${token}`,Header);
}

export const addBudget = async(data) =>{
    return await axios.post(`${base}/api/budget`,data,Header);
}

export const getBudgetById = async(id)=>{
    return await axios.get(`${base}/api/budget/get/${id}`,Header);
}

export const updateBudgetById = (id, updatedData) => {
    return axios.put(`${base}/api/budget/${id}`, updatedData);
  };
  
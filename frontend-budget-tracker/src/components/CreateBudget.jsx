import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCategory } from "../Service/TransactionService";
import { useDispatch } from "react-redux";
import { addCategory, initCategory } from "../Redux/CategorySlice";
import { addCategories } from "../Service/CategoryService"; 
import { addBudget } from "../Service/BudgetService";
import { useNavigate} from 'react-router-dom'

const CreateBudget = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const curCat = useSelector(state => state.category.categories);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("0");
  const [categories, setCategories] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [recommendedCategories, setRecommendedCategories] = useState([]);

  const handleAddCategory = () => {
    if (!category || !amount) return; 


    setCategories([...categories, { name : category, type, amount }]);
    setCategory("");
    setAmount("0");
  };

  const handleSaveBudget = async () => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
  
    const categoryPromises = categories.map(async (data) => {
      const isExist = curCat.find(
        (cat) => cat.name.toLowerCase() === data.name.toLowerCase()
      );
  
      if (isExist) {
        return {
          category: isExist,
          allocatedAmount: data.amount
        };
      } else {
        try {
          const response = await addCategories({
            name : data.name,
            type : data.type,
            userId: "65f025cfc3c561182e843dc0"
          });
          dispatch(addCategory(response.data));
          return {
            category: response.data,
            allocatedAmount: data.amount
          };
        } catch (error) {
          console.error("Failed to add category:", data.name, error);
          return null; // or handle how you want to skip it
        }
      }
    });
  
    const resolvedCategories = (await Promise.all(categoryPromises)).filter(Boolean); // remove nulls if any
    resolvedCategories.map(data=>console.log(data," -Check-  ")
    );

  
    const formateData = {
      month,
      totalIncome :  categories.reduce((sum, item) => {
        return item.type !== "Expense" ? sum + Number(item.amount) : sum;
      }, 0),
      totalExpense :  categories.reduce((sum, item) => {
        return item.type === "Expense" ? sum + Number(item.amount) : sum;
      }, 0),
      year,
      categories: resolvedCategories,
      userId : "65f025cfc3c561182e843dc0"
    };

    try {
      const response = await addBudget(formateData);
      if(response.status===201){
         navigate(-1);
      }else{
        alert("faild to create Budget");
      }
      
    } catch (error) {
      alert(error.message);
    }
    console.log("Saving budget with categories:", formateData);
  };
  

  const openEditModal = (index) => {
    setEditIndex(index);
    setEditAmount(categories[index].amount);
  };

  const handleEditSave = () => {
    const updated = [...categories];
    updated[editIndex].amount = editAmount;
    setCategories(updated);
    setEditIndex(null);
    setEditAmount("");
  };

  const getcurCategories = async()=>{
      try {

        const response = await getCategory("65f025cfc3c561182e843dc0");
        dispatch(initCategory(response.data));
        console.log(response.data);
      } catch (error) {
        alert("faild to fetch current category");
      }
  }

  useEffect(()=>{
      getcurCategories();
  },[])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">CreateBudget for April 2025</h2>

        {/* Form Inputs */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Category Name:</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={category}
            onChange={(e) => {
            setCategory(e.target.value);
            const recommended = curCat.filter(data =>  data.name.toLowerCase().includes(e.target.value.toLowerCase()));
            setRecommendedCategories(recommended.slice(0,3));
          }
        }
      />
          
              {recommendedCategories.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Recommended Categories:</h3>
                  <ul>
                    {recommendedCategories.map((cat, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-600 cursor-pointer hover:text-blue-500"
                        onClick={() => setCategory(cat.name)} // Optional click handler
                      >
                        {cat.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Type:</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-1">Budgeted Amount:</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded font-bold mb-6 hover:bg-green-600 w-full"
          onClick={handleAddCategory}
        >
          Add Category
        </button>

        {/* Category List */}
        {categories.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Added Categories:</h3>
            <ul className="space-y-2">
              {categories.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded border"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.type} - ${item.amount}
                    </p>
                  </div>
                  <button
                    onClick={() => openEditModal(index)}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300" onClick={()=> navigate(-1)}>
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSaveBudget}
          >
            Save Budget
          </button>
        </div>
      </div>

      {/* Edit Amount Modal */}
      {editIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Amount</h3>
            <input
              type="number"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setEditIndex(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleEditSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBudget;

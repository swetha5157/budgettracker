import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getBudgetById,
  updateBudgetById,
} from '../Service/BudgetService';
import { useSelector, useDispatch } from 'react-redux';
import { getCategory } from '../Service/TransactionService';
import { addCategory, initCategory } from '../Redux/CategorySlice';
import { addCategories } from '../Service/CategoryService';
import { initCurBudget, updateAllBudget } from '../Redux/BudgetSlice';

const BudgetDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.category.categories);
  const isAll = useSelector((state)=> state.budget.budget.isAll);
  const [budget, setBudget] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedAmount, setEditedAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('Expense');
  const [amount, setAmount] = useState('0');
  const [recommendedCategories, setRecommendedCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetRes, catData] = await Promise.all([
          getBudgetById(id),
          getCategory(),
        ]);
        console.log(budgetRes.data);
        
        setBudget(budgetRes.data);
        dispatch(initCategory(catData.data));
      } catch (err) {
        console.log('Error fetching data', err);
      }
    };
    fetchData();
  }, [id]);

  const handleEditClick = (index, currentAmount) => {
    setEditingIndex(index);
    setEditedAmount(currentAmount);
  };

  const handleSaveClick = async () => {
    // deep copy to avoid modifying read-only objects
    var updatedCategories = budget.categories.map((cat) => ({
      ...cat,
      allocatedAmount: cat.allocatedAmount,
      category: { ...cat.category },
    }));
  
    updatedCategories[editingIndex].allocatedAmount = editedAmount;
  
    try {
      await updateBudgetById(id, {
        ...budget,
        totalIncome: updatedCategories.reduce((sum, item) => {
          return item.category.type !== "Expense" ? sum + Number(item.allocatedAmount) : sum;
        }, 0),
        totalExpense: updatedCategories.reduce((sum, item) => {
          return item.category.type === "Expense" ? sum + Number(item.allocatedAmount) : sum;
        }, 0),
        categories: updatedCategories.map((cat) => ({
          category: cat.category,
          allocatedAmount: cat.allocatedAmount,
        })),
      });
  
      setBudget({ ...budget, categories: updatedCategories });
  
      if (isAll) {
        dispatch(updateAllBudget({ ...budget, categories: updatedCategories }));
      } else {
        dispatch(initCurBudget({ ...budget, categories: updatedCategories }));
      }
  
      setEditingIndex(null);
    } catch (err) {
      console.error("Failed to update", err);
    }
  };
  

  const handleDelete = async (index) => {
    const updatedCategories = [...budget.categories];
    updatedCategories.splice(index, 1);

    try {
      await updateBudgetById(id, {
        ...budget,
        totalIncome :  updatedCategories.reduce((sum, item) => {
          return item.category.type !== "Expense" ? sum + Number(item.allocatedAmount) : sum;
        }, 0),
        totalExpense :  updatedCategories.reduce((sum, item) => {
          return item.category.type === "Expense" ? sum + Number(item.allocatedAmount) : sum;
        }, 0),
        categories: updatedCategories.map((cat) => ({
          category: cat.category,
          allocatedAmount: cat.allocatedAmount,
        })),
      });
      setBudget({...budget, categories: updatedCategories });
      if(isAll) dispatch(updateAllBudget({ ...budget, categories: updatedCategories }));
      else dispatch(initCurBudget({...budget, categories: updatedCategories }));
    } catch (err) {
      console.error('Failed to delete category', err);
    }
  };

  const findCategoryId = async () => {
    const isExist = allCategories.find(
      (cat) => cat.name.toLowerCase() === category.toLowerCase()
    );

    if (isExist) {
      return isExist;
    } else {
      try {
        const response = await addCategories({
          name: category,
          type
        });
        dispatch(addCategory(response.data));
        return response.data
      } catch (error) {
        console.error('Failed to add category:', category, error);
        return null;
      }
    }
  };

  const handleAddCategory = async () => {
    var updatedCategories = [...budget.categories];

    // Fetch actual category name from ID
    const lowerCaseCategory = category.toLowerCase();

    const isAlreadyExist = budget.categories.some(data=>data.category.name.toLowerCase()===category.toLowerCase());

    if (isAlreadyExist) {
      alert(`The category "${category}" is already present in the budget.`);
      return;
    }

    const getnewCategory = await findCategoryId();
    if (getnewCategory === null) return;
    
    updatedCategories.push({category : getnewCategory,allocatedAmount : amount});
    updatedCategories.map((cat) => console.log(cat,"/n"));
    

    try {
      await updateBudgetById(id, {
        ...budget,
        totalIncome :  updatedCategories.reduce((sum, item) => {
          return item.category.type !== "Expense" ? sum + Number(item.allocatedAmount) : sum;
        }, 0),
        totalExpense :  updatedCategories.reduce((sum, item) => {
          return item.category.type === "Expense" ? sum + Number(item.allocatedAmount) : sum;
        }, 0),
        categories: updatedCategories.map((cat) => ({
          
          category: cat.category._id,
          allocatedAmount: cat.allocatedAmount, 
        })),
      });
      setBudget({...budget, categories: updatedCategories });
      if(isAll) dispatch(updateAllBudget({ ...budget, categories: updatedCategories }));
      else dispatch(initCurBudget({...budget, categories: updatedCategories }));
    } catch (err) {
      console.error('Failed to add category', err);
    }
  };

  if (!budget) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Budget Details - {budget.month}/{budget.year}
      </h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {budget.categories.map((cat, idx) => {
          return (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 shadow-md border hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {cat.category.name}
              </h3>
              {editingIndex === idx ? (
                <>
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-full mb-2"
                    value={editedAmount}
                    onChange={(e) => setEditedAmount(e.target.value)}
                  />
                  <button
                    onClick={handleSaveClick}
                    className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xl font-semibold text-green-600 mb-2">
                    ${cat.allocatedAmount}
                  </p>
                  <button
                    onClick={() => handleEditClick(idx, cat.allocatedAmount)}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                </>
              )}
              <button
                onClick={() => handleDelete(idx)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Category Section */}
      <div className="bg-white p-4 rounded-lg shadow-md border">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Add New Category</h3>

        <div className="flex flex-col sm:flex-row sm:items-end gap-3">
          <div className="mb-4">
            <label className="block font-semibold mb-1">Category Name:</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                const recommended = allCategories.filter((data) =>
                  data.name.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setRecommendedCategories(recommended.slice(0, 3));
              }}
            />
            {recommendedCategories.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Recommended Categories:</h3>
                <ul>
                  {recommendedCategories.map((cat, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 cursor-pointer hover:text-blue-500"
                      onClick={() => setCategory(cat.name)}
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

          <div className="mb-4">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border px-3 py-2 rounded w-full sm:w-3/4"
            />
          </div>

          <div className="mb-4">
            <button
              onClick={handleAddCategory}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetDetails;

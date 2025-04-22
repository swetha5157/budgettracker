import { useState, useEffect } from "react";
import axios from "axios";
import { format, formatDate } from "date-fns";
import {useDispatch} from 'react-redux'
import { addTransaction, updateTransac } from "../Redux/Transaction";
import { createTransaction, getAllTransaction, updateTransaction } from "../Service/TransactionService";

const Transactions = () => {
  // States for transaction data
  const [transactions, setTransactions] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({
    type: "all",
    sortBy: "date",
    sortDir: "desc",
  });

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    amount: "",
    date: new Date().toISOString().split("T")[0],
    note: "",
    categoryName: "",
    categoryType: "Expense",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Reset form when modal opens for editing or adding
  useEffect(() => {
    if (isEditModalOpen && selectedTransaction) {
      setFormData({
        amount: selectedTransaction.amount,
        date: new Date(selectedTransaction.date).toISOString().split("T")[0],
        note: selectedTransaction.note || "",
        categoryName: selectedTransaction.categoryId.name,
        categoryType: selectedTransaction.categoryId.type,
      });
    } else if (isAddModalOpen) {
      // Reset form when opening for a new transaction
      setFormData({
        amount: "",
        date: new Date().toISOString().split("T")[0],
        note: "",
        categoryName: "",
        categoryType: "Expense",
      });
    }
    setFormError("");
  }, [isEditModalOpen, selectedTransaction, isAddModalOpen]);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await getAllTransaction("65f025cfc3c561182e843dc0");
      // Ensure we're setting an array, even if the API returns something unexpected
      setTransactions(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Failed to fetch transactions");
      setTransactions([]); // Initialize with empty array on failure
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/transactions/${id}`, {
          headers: {
            // Authorization: `Bearer ${token}`,
          },
        });
        setTransactions((prev) =>
          Array.isArray(prev) ? prev.filter((t) => t._id !== id) : []
        );
        if (isDetailModalOpen) {
          setIsDetailModalOpen(false);
        }
      } catch (error) {
        setError("Failed to delete transaction");
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      };

      if (isEditModalOpen && selectedTransaction) {
        try {
          const response = await updateTransaction(selectedTransaction._id,formData);
          dispatch(updateTransac(response.data));
          
        } catch (error) {
          alert(error.message);
        }
        
      } else {
        console.log("post...!",formData);
        formData["userId"] = "65f025cfc3c561182e843dc0";
        
        const response = await createTransaction(formData);
        console.log(response);
        if(response.status===201){
          console.log(response.data);
          dispatch(addTransaction(response.data));
        }else{
          alert(response.status);
        }
      }

      fetchTransactions();
      closeAllModals();
    } catch (error) {
      setFormError(error.response?.data?.message || "Something went wrong");
    } finally {
      setFormLoading(false);
    }
  };

  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const openDetailModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  };

  const closeAllModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDetailModalOpen(false);
  };

  // Make sure transactions is an array before filtering
  const filteredTransactions = Array.isArray(transactions)
    ? transactions
        .filter((t) => {
          if (filter.type === "all") return true;
          return t.categoryId.type === filter.type;
        })
        .sort((a, b) => {
          if (filter.sortBy === "date") {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return filter.sortDir === "asc" ? dateA - dateB : dateB - dateA;
          } else if (filter.sortBy === "amount") {
            return filter.sortDir === "asc"
              ? a.amount - b.amount
              : b.amount - a.amount;
          }
          return 0;
        })
    : [];

  if (loading)
    return <div className="text-center py-8">Loading transactions...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Transactions Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Transaction
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            name="type"
            value={filter.type}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="all">All</option>
            <option value="Expense">Expenses</option>
            <option value="Income">Income</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            name="sortBy"
            value={filter.sortBy}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Order
          </label>
          <select
            name="sortDir"
            value={filter.sortDir}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Transaction List */}
      {filteredTransactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No transactions found. Start by adding a new transaction.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Note</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction._id} className="border-b hover:bg-gray-50">
                  <td
                    className="py-3 px-4 cursor-pointer"
                    onClick={() => openDetailModal(transaction)}
                  >
                    {format(new Date(transaction.date), "MMM dd, yyyy")}
                  </td>
                  <td
                    className="py-3 px-4 cursor-pointer"
                    onClick={() => openDetailModal(transaction)}
                  >
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs ${
                        transaction.categoryId.type === "Expense"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {transaction.categoryId.name}
                    </span>
                  </td>
                  <td
                    className="py-3 px-4 cursor-pointer"
                    onClick={() => openDetailModal(transaction)}
                  >
                    {transaction.note || "-"}
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-medium cursor-pointer ${
                      transaction.categoryId.type === "Expense"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                    onClick={() => openDetailModal(transaction)}
                  >
                    {transaction.categoryId.type === "Expense" ? "-" : "+"}$
                    {transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => openEditModal(transaction)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(transaction._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Transaction Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {isEditModalOpen ? "Edit Transaction" : "Add New Transaction"}
              </h2>
              <button
                onClick={closeAllModals}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {formError && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Transaction Type
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="categoryType"
                      value="Expense"
                      checked={formData.categoryType === "Expense"}
                      onChange={handleFormChange}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Expense</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="categoryType"
                      value="Income"
                      checked={formData.categoryType === "Income"}
                      onChange={handleFormChange}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Income</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="amount">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleFormChange}
                  step="0.01"
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="categoryName"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="categoryName"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleFormChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="note">
                  Note
                </label>
                <textarea
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleFormChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeAllModals}
                  className="mr-4 px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {formLoading
                    ? "Saving..."
                    : isEditModalOpen
                    ? "Update"
                    : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transaction Detail Modal */}
      {isDetailModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Transaction Details</h2>
              <button
                onClick={closeAllModals}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p
                    className={`text-xl font-bold ${
                      selectedTransaction.categoryId.type === "Expense"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {selectedTransaction.categoryId.type === "Expense"
                      ? "-"
                      : "+"}
                    ${selectedTransaction.amount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-xl font-medium">
                    {format(
                      new Date(selectedTransaction.date),
                      "MMMM dd, yyyy"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="text-xl">
                    <span
                      className={`inline-block px-2 py-1 rounded ${
                        selectedTransaction.categoryId.type === "Expense"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {selectedTransaction.categoryId.name}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="text-xl font-medium capitalize">
                    {selectedTransaction.categoryId.type}
                  </p>
                </div>
              </div>
            </div>

            {selectedTransaction.note && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Note</h3>
                <p className="bg-gray-50 p-4 rounded">
                  {selectedTransaction.note}
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <button
                onClick={closeAllModals}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  openEditModal(selectedTransaction);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(selectedTransaction._id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;

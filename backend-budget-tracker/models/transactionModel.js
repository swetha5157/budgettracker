const mongoose = require('mongoose');
const Category = require('./categoryModel'); 

const transactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    note: { type: String, default: '' },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);

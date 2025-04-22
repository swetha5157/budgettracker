const mongoose = require('mongoose');

const monthlyBudgetSchema = new mongoose.Schema(
  {
    month: { type: String, required: true }, 
    year: { type: Number, required: true },
    totalIncome: { type: Number, default: 0 },
    totalExpense: { type: Number, default: 0 },
    savings: { type: Number, default: 0 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    categories: [
      {
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        allocatedAmount: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

monthlyBudgetSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('MonthlyBudget', monthlyBudgetSchema);

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ['Income', 'Expense'], required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Category', categorySchema);

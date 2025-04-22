const asyncHandler = require("express-async-handler");
const PDFDocument = require("pdfkit");
const Transaction = require("../models/transactionModel.js");
const MonthlyBudget = require("../models/monthlyBudgetModel.js");
const User = require("../models/userModel.js");

// Controller to generate PDF report
exports.generatePDF = asyncHandler(async (req, res) => {
  const { month, year } = req.query;
  const userId = req.user.userId;

  // Calculate the date range for the given month and year
  const startDate = new Date(`${year}-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  // Fetch user and transactions
  const user = await User.findById(userId);
  const transactions = await Transaction.find({
    userId,
    date: { $gte: startDate, $lt: endDate },
  }).populate("categoryId");

  // Calculate total income, expense, and savings for the period
  const allTransactions = await Transaction.find({ userId }).populate("categoryId");

  const totalIncome = allTransactions
    .filter((t) => t.categoryId?.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = allTransactions
    .filter((t) => t.categoryId?.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = totalIncome - totalExpense;

  // Set up the PDF response headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=report-${year}-${month}.pdf`);

  // Create PDF document
  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(res);

  // Add Title
  doc.fontSize(18).font('Helvetica-Bold').text("Financial Report", { align: "center" });
  doc.moveDown(2);

  // Add user information
  doc.fontSize(12).font('Helvetica').text(`User: ${user.name}`, { align: "left" });
  doc.text(`Report Period: ${year}-${month}`, { align: "left" });
  doc.text(`Generated On: ${new Date().toLocaleString()}`, { align: "left" });
  doc.moveDown();

  // Add Summary Stats with a table-like layout
  doc.fontSize(12).font('Helvetica-Bold').text("Summary", { underline: true });
  doc.moveDown();
  doc.fontSize(12).font('Helvetica').text(`Total Income: ₹${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}`);
  doc.text(`Total Expense: ₹${totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2 })}`);
  doc.text(`Savings: ₹${savings.toLocaleString(undefined, { minimumFractionDigits: 2 })}`);
  doc.moveDown(2);

  // Add Transactions Table Header
  doc.fontSize(13).font('Helvetica-Bold').text("Transactions", { underline: true });
  doc.moveDown();

  // Table Layout
  if (!transactions.length) {
    doc.fontSize(12).text("No transactions found for this period.");
  } else {
    doc.fontSize(12).font('Helvetica-Bold').text("Date       | Category           | Type       | Amount   | Note");
    doc.fontSize(12).font('Helvetica').text("---------------------------------------------------------------");
    
    transactions.forEach((txn) => {
      const txnDate = txn.date.toISOString().split("T")[0];
      const txnCategory = txn.categoryId?.name || "N/A";
      const txnType = txn.categoryId?.type || "N/A";
      const txnAmount = txn.amount.toLocaleString(undefined, { minimumFractionDigits: 2 });
      const txnNote = txn.note || "No notes";

      doc.text(`${txnDate} | ${txnCategory} | ${txnType} | ₹${txnAmount} | ${txnNote}`);
    });
  }

  // Finalize the document
  doc.end();
});

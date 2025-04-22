const AISercice = require('../services/AIService');
const { getMonthlyBudget } = require('../services/monthlyBudgetService');
const { getTransactionByMonth } = require('../services/transactionService');

exports.analysisAI = async(req,res)=>{
    try {
        const {month,year} = req.query;
        console.log(month,year);
        
        const transactions = await getTransactionByMonth(`${year}-${month}-01`,`${year}-${month}-31`);
        // console.log(transactions);
        
        const budget = await getMonthlyBudget(req.user.userId,month,year);
        const cleanBudget = budget.categories.map(item => ({
            category: item.category.name,
            type : item.category.type,
            amount: item.allocatedAmount
          }));
          
          const cleanTransaction = transactions.map(tx => ({
            category: tx.categoryId.name,
            amount: tx.amount,
            date: tx.date,
            type: tx.categoryId.type
          }));

          console.log(cleanBudget,cleanTransaction);
          
        const response = await AISercice.analysisMonth(cleanBudget,cleanTransaction);
        const jsonMatch = response.text.match(/```json\n({.*})\n```/s);
        const jsonData = JSON.parse(jsonMatch[1]);

        res.status(200).json(jsonData);
    } catch (error) {
        res.status(500).json({message : `internal Server Error : ${error.message}`});
    }
}
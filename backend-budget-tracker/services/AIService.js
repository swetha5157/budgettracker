const axios = require('axios');

class AISercice {
  static async analysisMonth(budget, transaction) {
    try {
              const prompt = `
        You are a financial analyst AI. Given the following monthly budget and transaction data, analyze it and return only a clean JSON object with these exact fields:

        {
          "message": "A brief summary about the user's spending habits and suggestions.",
          "bestCategory": "The category where the user performed best or null",
          "analysis": {
            "income": 0,
            "expenses": 0,
            "net": 0,
            "budget_vs_actual": {
              "Income": {
                "budgeted": 0,
                "actual": 0,
                "difference": 0
              },
              "Expense": {
                "budgeted": 0,
                "actual": 0,
                "difference": 0
              }
            }
          }
        }

        Instructions:
        - All numeric values should be plain numbers (not in arrays).
        - Only return valid JSON, no explanation, no formatting outside of the JSON.
        - Summarize spending based on comparison between actuals and budget.
        - Mention surplus or overspending in the message.

        Data:
        Budget: ${JSON.stringify(budget)}
        Transactions: ${JSON.stringify(transaction)}
        `;

      
        const response = await axios.post(process.env.GEMINI_URL, { contents: [{ parts: [{ text: prompt }] }] },
            { headers: { "Content-Type": "application/json" } });  
        return response.data.candidates[0].content.parts[0];
    }catch(e) { 
        throw e;
    }
  }
}

module.exports = AISercice;

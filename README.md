#  Budget Tracker App

A smart, AI-powered budget management tool that helps users create monthly budgets, categorize expenses and incomes, track transactions, visualize their financial insights and 
analyze monthly budgets

##  Features

- ** Monthly Budget Creation**  
  Create a monthly budget with customizable categories and types (Income/Expense), and allocate specific amounts.

- ** Category & Type Support**  
  Each budget entry is categorized to help organize and analyze finances more effectively.

- ** Transaction Management**  
  Log daily transactions with type (Income/Expense), category, and amount.

- ** Real-Time Insights**  
  Visual graphs showing Expense vs Savings trends and overall monthly summary.

- ** AI-Powered Budget Analysis**  
  Integrated with **Gemini API** to analyze your financial behavior and suggest budgeting improvements.

- ** Monthly Reports**  
  Generate downloadable reports for the specified month with all transaction data to date.

---

##  Tech Stack

### Frontend

- React
- Redux Toolkit
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB for database

### AI Integration

- [Gemini API](https://deepmind.google/gemini/) for intelligent budget analysis and insights

---

##  Screenshots
### Adding transactions
![image](https://github.com/user-attachments/assets/a675baa4-4671-4a7e-97e4-631a33673a95)

### Monthly Budget Creation
![image](https://github.com/user-attachments/assets/a7a10bb5-4a18-46fa-af8c-f1a9bfc5bad9)

### Trends of monthly budgets
![image](https://github.com/user-attachments/assets/9e560153-4a2a-4c9b-b417-af7bf6d6e800)

### AI budget analysis
![image](https://github.com/user-attachments/assets/34840bbd-9195-41a0-9ef2-52dffb91bbe7)

##  Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/swetha5157/budgettracker.git

### FRONTEND
cd frontend-budget-tracker
npm i

### BACKEND
cd backend-budget-tracker
npm i
```
###  Create a .env file and store the following
  - MONGO_URI=your_mongodb_connection_string
  - JWT_SECRET=your_jwt_secret
  - GEMINI_URL=your_gemini_api_key





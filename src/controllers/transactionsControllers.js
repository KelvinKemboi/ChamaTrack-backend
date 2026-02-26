// used to control large number sof code to avoid confusion in larer files
import {sql} from "../config/db.js"

export async function graphedData(req, res) {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const rows = await sql`
      SELECT
        TO_CHAR(created_at, 'YYYY-MM') AS month,
        COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) AS income,
        ABS(COALESCE(SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END), 0)) AS expenses
      FROM transactions
      WHERE user_id = ${userId}
      GROUP BY month
      ORDER BY month
    `;

    return res.status(200).json({
      labels: rows.map((r) => r.month),
      income: rows.map((r) => Number(r.income)),
      expenses: rows.map((r) => Number(r.expenses)),
    });
  } catch (error) {
    console.log("Error getting graph data", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getTransactionByUserId (req,res) {
    try{
      const {userId} = req.params;
      
      const transactions= await sql `
      SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
      `;
  
      res.status(200).json(transactions);
    }
    catch(error){
      console.log("Error retrieving the transaction", error)
      return res.status(500).json({message: "Internal server error"})
     }
  };

export async function  getSummaryByUserId(req,res) {
    try{
    const {userId}= req.params;
  
    const balanceResult= await sql `
    SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id= ${userId}
    `
  
    const incomeResult= await sql `
    SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id= ${userId} AND amount > 0
    `
  
    const expensesResult= await sql `
    SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions WHERE user_id= ${userId} AND amount < 0
    `
    res.status(200).json({
      income: incomeResult [0].income,
      expenses: expensesResult [0].expenses,
      balance: balanceResult [0].balance
    })
    }
    catch(error){
      console.log("Error getting the summary", error)
      return res.status(500).json({message: "Internal server error"})
     }
  };

export async function createTransactions(req,res) {
    // title, amount, category, user_id
    try{
     const{user_id, title, amount, category}=req.body;
     console.log("Request body:", req.body);
     
     if(!user_id|| !title|| !category|| amount=== undefined){
      return res.status(400).json({message:"All fields are required"});
     }

     if (!req.body) {
        return res.status(400).json({ message: "Missing request body" });
      }
      
     const transaction= await sql `
     INSERT INTO transactions (user_id, title, amount, category)
     VALUES (${user_id}, ${title}, ${amount}, ${category})
     RETURNING *
     `;
  
     console.log(transaction)
     res.status(201).json(transaction[0]);
  
    }
    catch(error){
     console.log("Error creating the transaction", error)
     return res.status(500).json({message: "Internal server error"})
    }
  }

export async function deleteTransactionsByUserId (req,res) {
    try{
      const {id}= req.params;
  
      if(isNaN(parseInt(id))){
        return res.status(400).json({message: "Invalid transaction ID"})
      }
  
      const result= await sql `
      DELETE FROM transactions WHERE id = ${id} RETURNING *
      `;
      
      if(result.length ===0){
        return res.status(404).json({message: "Transaction not found"});
      }
  
      res.status(200).json({message: "Transaction deleted successfully"})
    }
    catch(error){
      console.log("Error deleting the transaction", error)
      return res.status(500).json({message: "Internal server error"})
     }
  }
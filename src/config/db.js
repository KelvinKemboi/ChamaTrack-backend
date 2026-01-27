import {neon} from "@neondatabase/serverless";
import "dotenv/config"; //allows using process.env to make the sql connection
// Creates a SQL connection with our database
export const sql= neon(process.env.DATABASE_URL)

 
// must use single backtick (`) when dealing with sql database
export async function initDB() {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )
      `;
    // decimal(10,2) means that it ca hold a maximum of 10 digits. 8 digits before the decimal point and 2 after
     console.log("Database created successfully");
    }catch (error){
     console.log("Error in initializing database", error);
     process.exit(1) // status code 1 is failure
    }
  }
  
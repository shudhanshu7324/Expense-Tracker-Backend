import express from "express";
import dotenv from "dotenv";
import  connectDb  from "./db.js";
import userRouter from './routes/user.route.js'
import expenseRouter from './routes/expense.route.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res) => {
    res.send("Expense Tracker Homepage")
})

app.use('/api/v1',userRouter)
app.use('/api/v1',expenseRouter)-

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDb();
});

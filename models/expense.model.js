import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    expenseName: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);

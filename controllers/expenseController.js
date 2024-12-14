import User from "../models/user.model.js";
import Expense from "../models/expense.model.js";

export const getUserExpenses = async (req, res) => {
  try {
    // Retrieve the user ID from the decoded token

    // Fetch all expenses linked to this user ID
    const userId = localStorage.getItem("userId");
    // const userId = req.headers.userid;
    // console.log(userId)

    const userExpenses = await Expense.find({userId});

    // If no expenses are found, send a message
    if (!userExpenses.length) {
      return res.status(404).json({ message: "No expenses found for this user" });
    }

    // Respond with the list of expenses
    return res.status(200).json({ expenses: userExpenses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const addExpense = async (req, res) => {
  try {
    const { expenseName, amount, date, description } = req.body;
    const user = await User.findOne({ email: req.user.email });
    const newExpense = await Expense.create({
      expenseName,
      amount,
      date,
      description,
      userId: user._id,
    });
    return res
      .status(200)
      .json({ message: "Expense created successfully", id: newExpense._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const { expenseName, amount, date, description } = req.body;

    // Find the expense by its ID and update with the new data
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      {
        expenseName,
        amount,
        date,
        description,
      },
      { new: true } // Returns the updated document
    );

    // If no expense is found
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;

    // Find and delete the expense by ID
    const expense = await Expense.findByIdAndDelete(id);

    // If no expense is found with the given ID
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Respond with a success message
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

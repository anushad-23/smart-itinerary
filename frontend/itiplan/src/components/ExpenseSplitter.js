import React, { useState } from "react";
import API from "../api/axios";
import "./ExpenseSplitter.css";

function ExpenseSplitter({ tripId, tripMembers = [], expenses = [] }) {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "other",
    date: new Date().toISOString().split('T')[0],
    paid_by: null
  });
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleAddExpense = async () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.paid_by) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const expenseData = {
        ...newExpense,
        amount: parseFloat(newExpense.amount)
      };
      
      const response = await API.post('/api/expenses/', expenseData);
      const createdExpense = response.data;

      // Split the expense among selected members
      if (selectedMembers.length > 0) {
        await API.post(`/api/expenses/${createdExpense.id}/split/`, {
          users: selectedMembers
        });
      }

      alert("Expense added successfully!");
      setShowAddExpense(false);
      setNewExpense({
        description: "",
        amount: "",
        category: "other",
        date: new Date().toISOString().split('T')[0],
        paid_by: null
      });
      setSelectedMembers([]);
      
      // Refresh expenses
      window.location.reload();
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense");
    }
  };

  const toggleMember = (memberId) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const categories = [
    { value: 'accommodation', label: 'Accommodation' },
    { value: 'transport', label: 'Transport' },
    { value: 'food', label: 'Food & Dining' },
    { value: 'attraction', label: 'Attractions' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="expense-splitter">
      <div className="expense-header">
        <h2>Expense Tracker</h2>
        <button 
          className="btn-add-expense"
          onClick={() => setShowAddExpense(!showAddExpense)}
        >
          + Add Expense
        </button>
      </div>

      {showAddExpense && (
        <div className="add-expense-form">
          <h3>Add New Expense</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Description *</label>
              <input
                type="text"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                placeholder="e.g., Dinner at restaurant"
              />
            </div>

            <div className="form-group">
              <label>Amount *</label>
              <input
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Paid By *</label>
            <select
              value={newExpense.paid_by || ""}
              onChange={(e) => setNewExpense({...newExpense, paid_by: parseInt(e.target.value)})}
            >
              <option value="">Select person</option>
              {tripMembers.map(member => (
                <option key={member.id} value={member.id}>
                  {member.username}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Split Among</label>
            <div className="member-selection">
              {tripMembers.map(member => (
                <label key={member.id} className="member-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(member.id)}
                    onChange={() => toggleMember(member.id)}
                  />
                  {member.username}
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button onClick={() => setShowAddExpense(false)} className="btn-cancel">
              Cancel
            </button>
            <button onClick={handleAddExpense} className="btn-save">
              Save Expense
            </button>
          </div>
        </div>
      )}

      <div className="expenses-list">
        {expenses.length > 0 ? (
          expenses.map(expense => (
            <div key={expense.id} className="expense-item">
              <div className="expense-header-row">
                <h4>{expense.description}</h4>
                <span className="expense-amount">${expense.amount}</span>
              </div>
              <div className="expense-details">
                <span className="expense-category">{expense.category}</span>
                <span className="expense-date">{expense.date}</span>
                <span className="expense-paid-by">Paid by: {expense.paid_by?.username}</span>
              </div>
              {expense.splits && expense.splits.length > 0 && (
                <div className="expense-splits">
                  <strong>Splits:</strong>
                  {expense.splits.map(split => (
                    <span key={split.id} className="split-item">
                      {split.user?.username}: ${split.amount}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-expenses">No expenses yet. Add one to get started!</p>
        )}
      </div>
    </div>
  );
}

export default ExpenseSplitter;



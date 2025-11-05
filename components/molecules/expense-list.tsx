
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

import { Expense } from '@/types/common';
import { getCategoryIcon } from '@/lib/utils/category-icons';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Plus size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses yet</h3>
        <p className="text-gray-600">Tap the + button to add your first expense</p>
      </div>
    );
  }

  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-3">
      {sortedExpenses.map((expense) => {
        const CategoryIcon = getCategoryIcon(expense.category);
        const date = new Date(expense.date);
        const formattedDate = date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });

        return (
          <div
            key={expense.id}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <CategoryIcon size={20} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{expense.title}</h3>
                  <p className="text-sm text-gray-600">
                    {expense.category} • {formattedDate}
                  </p>
                  {expense.notes && (
                    <p className="text-xs text-gray-500 mt-1">{expense.notes}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900">
                  ${expense.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="p-1 rounded-lg hover:bg-red-100 text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseList;

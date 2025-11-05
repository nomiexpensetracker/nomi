import { format } from 'date-fns';
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/atoms/tabs';
import { Expense } from '@/types/common';
import { getCategoryIcon } from '@/lib/utils/category-icons';

interface ExpensesTabsProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const ExpensesTabs: React.FC<ExpensesTabsProps> = ({ expenses }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = format(new Date(), 'MMM');
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const getExpensesByMonth = (month: string) => {
    return expenses
      .filter(exp => format(new Date(exp.date), 'MMM') === month)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Food: 'bg-purple-500',
      Bills: 'bg-cyan-500',
      Transport: 'bg-amber-500',
      Entertainment: 'bg-pink-500',
      Others: 'bg-gray-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="px-6 pb-24">
      <Tabs value={selectedMonth} onValueChange={setSelectedMonth} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto bg-transparent border-b rounded-none h-auto p-0 mb-6">
          {months.map(month => {
            const count = getExpensesByMonth(month).length;
            return (
              <TabsTrigger
                key={month}
                value={month}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0047BB] data-[state=active]:bg-transparent px-4 py-3 data-[state=active]:shadow-none"
                disabled={count === 0}
              >
                {month}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {months.map(month => (
          <TabsContent key={month} value={month} className="mt-0">
            <div className="space-y-4">
              {getExpensesByMonth(month).map((expense) => {
                const CategoryIcon = getCategoryIcon(expense.category);
                const dayOfWeek = format(new Date(expense.date), 'EEE').toUpperCase();
                const dayOfMonth = format(new Date(expense.date), 'd');

                return (
                  <div key={expense.id} className="flex items-start gap-4">
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div className="text-center min-w-[45px]">
                        <div className="text-xs text-muted-foreground font-medium">{dayOfWeek}</div>
                        <div className="text-lg font-bold">{dayOfMonth}</div>
                        <div className="w-1 h-1 bg-cyan-400 rounded-full mx-auto mt-1"></div>
                      </div>
                    </div>

                    {/* Expense Card */}
                    <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`${getCategoryColor(expense.category)} p-3 rounded-xl`}>
                            <CategoryIcon size={20} className="text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{expense.category}</h3>
                            <p className="text-sm text-muted-foreground">{expense.title}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">-${expense.amount.toFixed(0)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {getExpensesByMonth(month).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No expenses in {month}
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ExpensesTabs;

import React from 'react';

import { Category } from '@/types/common';
import { getCategoryIcon } from '@/lib/utils/category-icons';

interface CategorySelectorProps {
  selectedCategory: Category;
  onCategorySelect: (category: Category) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  const categories: Category[] = ['Food', 'Bills', 'Transport', 'Entertainment', 'Others'];

  return (
    <div className="grid grid-cols-5 gap-2">
      {categories.map((category) => {
        const Icon = getCategoryIcon(category);
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategorySelect(category)}
            className={`p-3 rounded-xl border-2 transition-all ${
              isSelected
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center space-y-1">
              <Icon size={20} className={isSelected ? 'text-purple-600' : 'text-gray-600'} />
              <span className={`text-xs ${isSelected ? 'text-purple-600 font-medium' : 'text-gray-600'}`}>
                {category}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default CategorySelector;

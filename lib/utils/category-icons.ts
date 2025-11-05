
import { 
  Car, 
  Gamepad2, 
  CreditCard, 
  LucideIcon,
  MoreHorizontal,
  UtensilsCrossed,
} from 'lucide-react';

import { Category } from '@/types/common';

export const getCategoryIcon = (category: Category): LucideIcon => {
  const iconMap: Record<Category, LucideIcon> = {
    Food: UtensilsCrossed,
    Bills: CreditCard,
    Transport: Car,
    Entertainment: Gamepad2,
    Others: MoreHorizontal,
  };

  return iconMap[category];
};

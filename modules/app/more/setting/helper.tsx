import {
  User,
  Bell,
  Lock,
  LogOut,
  XCircle,
  FileText,
  Languages,
  DollarSign,
  LucideIcon,
  AlertCircle,
} from 'lucide-react';

interface SettingMenu {
  id: string
  icon: LucideIcon
  type: 'primary' | 'normal' | 'danger'
  link: string
  label: string
}

export const settingsMenu: SettingMenu[] = [
  {
    id: 'personal-info',
    icon: User,
    type: 'primary',
    link: '/app/more/setting/personal-info',
    label: 'Personal Info',
  },
  {
    id: 'notification',
    icon: Bell,
    type: 'normal',
    link: '/app/more/setting/notification',
    label: 'Notification',
  },
  {
    id: 'language',
    icon: Languages,
    type: 'normal',
    link: '/app/more/setting/language',
    label: 'Language',
  },
  {
    id: 'currency',
    icon: DollarSign,
    type: 'normal',
    link: '/app/more/setting/currency',
    label: 'Currency',
  },
  {
    id: 'e-statements',
    icon: FileText,
    type: 'normal',
    link: '/app/more/setting/e-statements',
    label: 'E-Statements',
  },
  {
    id: 'expenses-threshold',
    icon: AlertCircle,
    type: 'normal',
    link: '/app/more/setting/expenses-threshold',
    label: 'Expenses Threshold',
  },
  {
    id: 'change-password',
    icon: Lock,
    type: 'normal',
    link: '/app/more/setting/change-password',
    label: 'Change Password',
  },
  {
    id: 'close-account',
    icon: XCircle,
    type: 'danger',
    link: '/app/more/setting/close-account',
    label: 'Close Account',
  },
  {
    id: 'log-out',
    icon: LogOut,
    type: 'normal',
    link: '/app/more/setting/log-out',
    label: 'Log Out',
  },
];
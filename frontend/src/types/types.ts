export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
}


export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  token: string;
}


export interface LoginCredentials {
  email: string;
  password: string;
}


export interface RegisterData {
  name: string;
  email: string;
  password: string;
}


export type IssueStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type IssuePriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type IssueSeverity = 'Minor' | 'Major' | 'Critical';

export interface Issue {
  id: number;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  severity: IssueSeverity;
  created_by: number;
  creator_name?: string;
  creator_email?: string;
  created_at: string;
  updated_at: string;
}

export interface IssueFormData {
  title: string;
  description: string;
  status?: IssueStatus;
  priority?: IssuePriority;
  severity?: IssueSeverity;
}

export interface IssuesResponse {
  issues: Issue[];
  total: number;
  page: number;
  totalPages: number;
}

export interface IssueStats {
  Open: number;
  'In Progress': number;
  Resolved: number;
  Closed: number;
}

export interface IssueFilters {
  page?: number;
  limit?: number;
  status?: IssueStatus;
  priority?: IssuePriority;
  search?: string;
}


export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export interface InputProps {
  label?: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface TextareaProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'full';
  showCloseButton?: boolean;
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: string;
  size?: 'small' | 'medium' | 'large';
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'normal' | 'large';
  hover?: boolean;
}

export interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  text?: string;
}

export interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  className?: string;
}

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}
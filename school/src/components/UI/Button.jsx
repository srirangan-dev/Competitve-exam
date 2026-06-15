import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  icon: Icon,
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'btn transition-all duration-200 inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:scale-95 shadow-md hover:shadow-lg disabled:opacity-50',
    secondary: 'bg-accent-100 text-accent-900 hover:bg-accent-200 border border-accent-200',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:scale-95',
    success: 'bg-success-600 text-white hover:bg-success-700 active:scale-95 shadow-md',
    danger: 'bg-danger-600 text-white hover:bg-danger-700 active:scale-95 shadow-md',
    ghost: 'text-primary-600 hover:bg-primary-50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || isLoading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${className}
      `}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon size={20} />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
